import compression from 'compression';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import logger from 'morgan';
import multer from 'multer';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/config.js';
import configurePassport from './config/passport.js';
import { applyGlobalRateLimiter } from './middleware/globalRateLimiter.js';
import { clientErrorHandler, errorHandler, logErrors } from './middleware/handlerErrors.js';
import { requestLoggerMiddleware } from './middleware/httpLogger.js';
import { registerRoutes } from './routes/index.js';
import { initializeFirebase } from './services/firebaseService.js';
import { swaggerDocs } from './v1/swagger.js';

export async function createApp() {
  const app = express();
  app.set('trust proxy', 1);

  // Firebase
  await initializeFirebase();

  // Middlewares globales
  const upload = multer({ storage: multer.memoryStorage() });
  app.use(logger('dev'));
  app.use(express.json());
  //html a json
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: [`https://${config.domain}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  app.use(helmet({
    contentSecurityPolicy: false, // si no la configuras manualmente
  }));
  //reduce el tamaño de las respuestas
  app.use(compression());

  // Sesión
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));

  // Passport
  configurePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  // Desactivar x-powered-by
  app.disable('x-powered-by');

  // Logging con sanitización
  app.use(requestLoggerMiddleware);

  // Static files
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

  // Rate Limiter
  applyGlobalRateLimiter(app);

  // Rutas
  registerRoutes(app, upload);

  // Swagger
  swaggerDocs(app, app.get('port'));

  // Ruta raíz
  app.get('/', (req, res) => res.send('Cociando - raíz'));

  // Manejo de errores
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);

  return app;
}
