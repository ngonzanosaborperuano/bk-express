import compression from 'compression';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import logger from 'morgan';
import multer from 'multer';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import configurePassport from './config/passport.js';
import { RateLimiterGlobal } from './middleware/globalRateLimiter.js';
import { clientErrorHandler, errorHandler, logErrors } from './middleware/handlerErrors.js';
import { requestLoggerMiddleware } from './middleware/httpLogger.js';
import { Routers } from './routes/index.js';
import { initializeFirebase } from './services/firebaseService.js';
import { swaggerDocs } from './v1/swagger.js';

export class AppFactory {
  constructor() {
    this.app = express();
    this.upload = multer({ storage: multer.memoryStorage() });
    this.routes = new Routers();
    this.rateLimitGlobal = new RateLimiterGlobal();
  }

  async init() {
    this._trustProxy();
    await this._initializeFirebase();
    this._setupGlobalMiddlewares();
    this._setupSession();
    this._setupPassport();
    this._disablePoweredBy();
    this._setupLogging();
    this._setupStaticFiles();
    this._setupRateLimiting();
    this._registerRoutes();
    this._setupSwagger();
    this._setupRootRoute();
    this._setupErrorHandlers();
    return this.app;
  }

  _trustProxy() {
    this.app.set('trust proxy', 1);
  }

  async _initializeFirebase() {
    await initializeFirebase();
  }

  _setupGlobalMiddlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cors({
    //   origin: [`https://${config.domain}`],
    //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // }));
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(compression());
  }

  _setupSession() {
    this.app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    }));
  }

  _setupPassport() {
    configurePassport(passport);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  _disablePoweredBy() {
    this.app.disable('x-powered-by');
  }

  _setupLogging() {
    this.app.use(requestLoggerMiddleware);
  }

  _setupStaticFiles() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
  }

  _setupRateLimiting() {
    this.rateLimitGlobal.applyGlobalRateLimiter(this.app);
  }

  _registerRoutes() {
    this.routes.registerRoutes(this.app, this.upload);
  }

  _setupSwagger() {
    swaggerDocs(this.app, this.app.get('port'));
  }

  _setupRootRoute() {
    this.app.get('/', (req, res) => res.send('Cociando - raíz'));
  }

  _setupErrorHandlers() {
    this.app.use(logErrors);
    this.app.use(clientErrorHandler);
    this.app.use(errorHandler);
  }
}