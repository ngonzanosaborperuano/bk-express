// src/app.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { applyMiddlewares } from './middleware/appMiddlewares.js';
import { errorHandler } from './middleware/errorHandler.js';
import { applyGlobalRateLimiter } from './middleware/globalRateLimiter.js';
import { registerRoutes } from './routes/index.js';
import { initializeFirebase } from './services/firebaseService.js';
import { swaggerDocs } from './v1/swagger.js';

export async function createApp() {
  const app = express();
  app.set('trust proxy', 1);
  // Inicializar Firebase
  await initializeFirebase();

  // Multer en memoria (podría inyectarse si queremos más flexibilidad)
  const upload = multer({ storage: multer.memoryStorage() });

  applyMiddlewares(app);

  // Carpetas estáticas
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

  // Aplicar rate limiter global
  applyGlobalRateLimiter(app);

  // Registrar rutas
  registerRoutes(app, upload);

  // Documentación swagger
  swaggerDocs(app, app.get('port'));

  // Ruta raíz simple
  app.get('/', (req, res) => {
    res.send('Recetas - raíz');
  });

  // Middleware manejo de errores (último)
  app.use(errorHandler);

  return app;
}
