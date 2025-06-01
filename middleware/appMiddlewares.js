import compression from 'compression';
import cors from 'cors';
import express from 'express';
import sessionx from 'express-session';
import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';
import configurePassport from '../config/passport.js';
import { clientErrorHandler, errorHandler, logErrors } from '../middleware/handlerErrors.js';
import { guardarLog } from '../utils/logger.js'; // Ajusta la ruta según tu estructura

export const applyMiddlewares = (app) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: ['https://cocinando.shop'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));
    app.use(helmet());
    app.use(compression());

    app.use(sessionx({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    }));

    configurePassport(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.disable('x-powered-by');
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
    // Middleware para logging de cada respuesta HTTP
    app.use((req, res, next) => {
        const start = process.hrtime();

        res.on('finish', async () => {
            const diff = process.hrtime(start);
            const tiempo = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

            try {
                if (res.statusCode < 400 && res.statusCode != 304) {
                    await guardarLog({
                        metodo: req.method,
                        ruta: req.originalUrl,
                        cuerpo: req.body,
                        respuesta_ms: tiempo,
                        estado_http: res.statusCode,
                        mensaje: 'OK',
                        error: null
                    });
                }

            } catch (error) {
                console.error('Error al guardar log de respuesta:', error.message);
            }
        });

        next();
    });

};
