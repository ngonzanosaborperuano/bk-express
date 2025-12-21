# Backend Cocinando (Express + PostgreSQL + Pagos + AI)

API backend para la app **Cocinando**: gestión de recetas (persistidas en PostgreSQL), pagos (MercadoPago y PayU), logging a BD, métricas Prometheus, autenticación JWT (Passport) y utilidades de AI con **Genkit + Gemini**.

## Tecnologías y librerías principales

- **Runtime**: Node.js (proyecto en **ES Modules**: `"type": "module"`).
- **HTTP**: `express`, `body-parser`, `cors` (comentado), `multer`.
- **Seguridad**: `helmet`, `passport`, `passport-jwt`, `jsonwebtoken`, `express-rate-limit`, `express-session`.
- **Base de datos**: PostgreSQL vía `pg-promise` + `bluebird`.
- **Pagos**: `mercadopago` y generación de checkout URL para PayU.
- **Observabilidad**:
  - Logs a BD: middleware propio (`requestLoggerMiddleware`) + endpoint `/logs`.
  - Métricas Prometheus: `prom-client` en `/metrics`.
  - Logs HTTP: `morgan`.
- **Docs**: Swagger UI (`swagger-ui-express` + `yamljs`) en `/api/v1/docs`.
- **Firebase Admin**: inicialización de `firebase-admin` y verificación de **App Check** por header `X-Firebase-AppCheck`.
- **AI**: `genkit` + `@genkit-ai/googleai` (Gemini).

## Arquitectura (orientada a DDD por módulos)

El proyecto está organizado por **bounded contexts** en `src/modules/*`. La intención es separar:

- **domain**: entidades y reglas de negocio.
- **application**: casos de uso (orquestación de dominio).
- **infrastructure**: repositorios/servicios concretos (DB, SDKs externos, etc.).
- **interfaces/http**: routers y controllers (adaptadores HTTP).

Ejemplos en el repo:

- `src/modules/payments/`
  - `application/PaymentUseCase.js` (caso de uso)
  - `domain/entities/Payment.js` (entidad)
  - `infrastructure/services/PayuCheckoutService.js` (servicio externo)
  - `interfaces/http/*` (routers/controllers HTTP)
- `src/modules/recipes/`
  - `infrastructure/repositories/RecipeRepository.js` (DB)
  - `interfaces/http/*` (router/controller)
- `src/modules/logger/`
  - `infrastructure/services/logger.service.js` (servicio de logs)
  - `interfaces/http/*` (router/controller)

Además hay capas transversales:

- **Config**: `src/config/*`
- **DB**: `src/db/connection.js`
- **Middleware**: `src/middleware/*`
- **Shared**: `src/shared/*` (utilidades comunes)

## Estructura (alto nivel)

```text
src/
  interfaces/
    server.js                 # entrypoint (crea http server)
    app.js                    # AppFactory: middlewares + routes + swagger + errors
    http/v1/swagger.js        # Swagger UI + docs.json
    http/v1/docs/api.docs.yaml# OpenAPI
  config/
    config.js                 # env -> config
    keys.js                   # secretOrKey
    passport.js               # estrategia JWT
    mercadopago.config.js     # SDK MercadoPago
    genkit.config.js          # Genkit + Gemini
  db/connection.js            # pg-promise (Postgres)
  middleware/
    globalRateLimiter.js
    rateLimiterFactory.js
    applySensitiveRateLimiters.js
    verificarAppCheck.js
    httpLogger.js
    handlerErrors.js
  modules/
    payments/
    recipes/
    logger/
    users/                    # existe, pero hoy no se registra en Routers (ver “Gaps”)
  shared/
    utils/
      Firebase.js
      logger.js               # guardarLog / obtenerLogs
```

## Flujo de arranque (boot)

1. `src/interfaces/server.js` crea `http.createServer(app)` y hace `listen`.
2. `src/interfaces/app.js` (`AppFactory.init()`) configura:
   - `trust proxy`
   - inicializa Firebase Admin
   - middlewares globales (`morgan`, `express.json`, `helmet`, `compression`, etc.)
   - `express-session`
   - `passport` (JWT)
   - logger a BD (`requestLoggerMiddleware`)
   - archivos estáticos `/.well-known`
   - rate limiting global
   - métricas Prometheus (`/metrics`)
   - registro de rutas (módulos)
   - Swagger (`/api/v1/docs`)
   - handlers de error
   - Genkit (Gemini)

## Rutas/Endpoints (estado actual en runtime)

Las rutas se registran desde `src/modules/shared/interfaces/http/index.js` y hoy incluye:

- **MercadoPago** (`src/modules/payments/interfaces/http/mercadoPago.routes.js`)
  - `POST /mp/preferencia`: crea preferencia (SDK MercadoPago)
  - `POST /mp/notificacion`: endpoint “notification” (hoy responde `ok`)
  - `POST /mp/webhook`: procesa webhook (hoy hace logging y responde `{status:"ok"}`)
  - `POST /mp/suscripcion`: crea suscripción
  - `GET /mp/suscripcion/:id`: obtiene suscripción
  - `PUT /mp/suscripcion/:id`: actualiza suscripción (precio)

- **PayU** (`src/modules/payments/interfaces/http/payU.routers.js`)
  - `POST /api/payu/v1/checkout-url`: genera checkout URL firmada (MD5)

- **Recetas** (`src/modules/recipes/interfaces/http/recipe.route.js`)
  - `POST /recipe`: inserta receta completa en BD vía función SQL `insert_full_recipe(jsonb)`

- **Logs** (`src/modules/logger/interfaces/http/logger.routes.js`)
  - `GET /logs?limit=&metodo=&estado=&respuesta=`: consulta logs en BD

## Flujos por módulo (request → capas)

### 1) Recetas (`POST /recipe`)

- **Router**: `RecipeRouter` registra `POST /recipe`.
- **Controller**: `RecipeController.createRecipe()`.
- **Repo (DB)**: `RecipeRepository.insertFullRecipe(recipeJson)`.
- **SQL**: ejecuta `SELECT insert_full_recipe($1::jsonb) AS id`.
- **Salida**: `{ id }` con HTTP `201`.

Requisito de BD:
- Tablas y función `insert_full_recipe(jsonb)` están definidas en `bd/schema_recipes.sql`.

### 2) Logging y auditoría de requests

El middleware `requestLoggerMiddleware` guarda logs **al finalizar la respuesta** (`res.on('finish')`):

- Sanitiza campos sensibles (passwords, tokens, PII).
- Persiste en BD con `SELECT insertar_log(...)`.
- Excluye rutas como `/`, `/logs`, `/api/v1/docs` (y sus prefijos).

El endpoint `GET /logs` lee de BD con `SELECT * FROM obtener_logs(...)`.

> Nota: en este repo **no está el SQL** de `insertar_log` / `obtener_logs`. Ver “Gaps”.

### 3) MercadoPago (preferencias y webhooks)

- `POST /mp/preferencia`:
  - Controller: `PreferenciasController.create()`
  - Service: `MpPreferenciaService.crearPreferenciaService({items})`
  - SDK: `mercadopago.preferences.create(preference, headers)`
  - Usa `config.notification` como `notification_url`.

- Webhooks:
  - `POST /mp/webhook` llama `MpPreferenciaService.procesarWebhook(query, body)` (por ahora solo loguea y responde ok).

### 4) PayU (checkout URL)

- `POST /api/payu/v1/checkout-url`
  - Controller crea `Payment` desde body: `{ amount, description, reference, buyerEmail }`
  - Use case: `PaymentUseCase.execute(payment)`
  - Infra: `PayuCheckoutService.createCheckout(payment)`
    - Firma: `md5(apiKey~merchantId~reference~amount~currency)`
    - Devuelve `${PAYU_URL}?${params}`

## Seguridad

- **JWT**: `passport-jwt` con `Authorization: Bearer <token>`.
- **App Check**: middleware `AppCheckService.verificar()` lee `X-Firebase-AppCheck` y valida con `admin.appCheck().verifyToken(...)`.
- **Rate limiting**:
  - Global: 100 req/min (default).
  - Sensible (users): login 5/min, signup 10/h (ver “Usuarios” y “Gaps”).
- **Sesiones**: `express-session` está habilitado (ojo: `cookie.secure: true` requiere HTTPS).

## Observabilidad

- **Prometheus**: `GET /metrics`
- **Swagger UI**: `GET /api/v1/docs`
- **Swagger JSON**: `GET /api/v1/docs.json`

## Variables de entorno (requeridas/recomendadas)

En este repo tienes un template en `env.example`. Cópialo a `.env` y completa valores:

```bash
cp env.example .env
```

### App / Server

- `PORT_APP`: puerto de la app (default lógico: 3001).
- `API_APP`: host/ip de bind (ej. `0.0.0.0`).
- `DOMAIN`: dominio usado para imprimir la URL de Swagger.

### PostgreSQL (pg-promise)

- `host`
- `port`
- `database`
- `user`
- `password`

### Auth

- `secretOrKey`: secreto para firmar JWT (HS256).

### MercadoPago

- `MP_ACCESS_TOKEN`
- `MP_INTEGRATOR_ID`
- `NOTIFICATION_URL`
- `BACK_URL` (en config existe; el service actualmente usa URLs hardcodeadas para `back_urls`)

### PayU

- `PAYU_URL`
- `PAYU_MERCHANT_ID`
- `PAYU_ACCOUNT_ID`
- `PAYU_API_KEY`

### Genkit / Gemini

- `GOOGLE_API_KEY` (**obligatoria**; si falta, `genkit.config.js` lanza error)

### Firebase Admin

- `serviceAccountKey.json` se lee desde el root del repo (ver `src/shared/utils/Firebase.js`).
  - Recomendación: **no versionarlo** y usar secretos/volúmenes en deploy.

## Cómo correr el proyecto

### Local

```bash
npm install
cp env.example .env
npm run dev
```

### Producción

```bash
npm install --omit=dev
npm run start
```

## Docker

Hay `Dockerfile` multi-stage (Node 22). Verifica que el comando final coincida con tus scripts de `package.json`.

## Operación/Deploy (apuntes del repo)

En `docs/leer.md` hay comandos para:
- `gcloud` (instalación e init)
- SSH a servidor GCP
- despliegue con `pm2` (`stop`, `restart`, `logs`)
- túnel SSH hacia PostgreSQL

## Gaps / puntos a alinear (documentado a propósito)

- **Usuarios no están registrados en runtime**: `UserRouter` existe, pero en `Routers` está comentado. Swagger sí documenta `/api/users/*`.
  - Si quieres habilitarlo, se debe agregar `new UserRouter()` en `src/modules/shared/interfaces/http/index.js`.
- **Swagger vs rutas reales**: el YAML incluye Users + MP + Logs, pero no incluye `/recipe` ni PayU.
- **Funciones SQL de logs faltantes**: el código usa `insertar_log(...)` y `obtener_logs(...)`, pero no hay script SQL en el repo. Deben existir en la BD para que `/logs` y el middleware de logging funcionen.


