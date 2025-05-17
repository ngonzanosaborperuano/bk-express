import express from 'express';
import sessionx from 'express-session';
import http from 'http';
import responseTime from 'response-time';
import { guardarLog } from './utils/logger.js';
import logger from 'morgan';
import cors from 'cors';
import multer from 'multer';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import socketio from 'socket.io'; // ✅ IMPORTACIÓN CORRECTA para ESM + CommonJS
import configurePassport from './config/passport.js'; 


const { Server: SocketIOServer } = socketio;

import users from './routes/user.routes.js';
import mercadoPago from './routes/mercadoPago.routes.js';
import { swaggerDocs } from './src/v1/swagger.js';

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve('serviceAccountKey.json'), 'utf-8')
);

const app = express();
const server = http.createServer(app);




async function recetas() {
  // Inicializar Firebase
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin inicializado correctamente.");
  }

  // Configurar multer
  const upload = multer({
    storage: multer.memoryStorage(),
  });

  /* Rutas */
  const port = process.env.PORT_APP || 3000;
  app.use(logger("dev"));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.use(
    sessionx({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
  configurePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());  

  app.disable("x-powered-by");
  app.set("port", port);

  // Middleware para logging de cada respuesta HTTP
  app.use((req, res, next) => {
    const start = process.hrtime();

    res.on('finish', async () => {
      const diff = process.hrtime(start);
      const tiempo = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

      try {
        await guardarLog({
          metodo: req.method,
          ruta: req.originalUrl,
          cuerpo: req.body,
          respuesta_ms: tiempo,
          estado_http: res.statusCode,
          mensaje: res.statusCode < 400 ? 'OK' : 'ERROR',
          error: null
        });
      } catch (err) {
        console.error('Error al guardar log de respuesta:', err.message);
      }
    });

    next();
  });

  // Llamada a sockets
  // ticketSorteoSocket(io);

  // Llamando a las rutas
  users(app, upload)
  mercadoPago(app)

  swaggerDocs(app, port); // Documentación de Swagger

  app.get("/", (req, res) => {
    res.send("Recetas - raíz");
  });

  const host = process.env.API_APP || "localhost";
  server.listen(port, host, function () {
    console.log("App " + process.pid + " iniciada...");
    console.log("Port " + port + " iniciada...");
  });

  // Middleware global para manejo de errores
  app.use(async (err, req, res, next) => {
    console.error(err.stack);
    await guardarLog({
      metodo: req.method,
      ruta: req.originalUrl,
      cuerpo: req.body,
      respuesta_ms: 0,
      estado_http: err.status || 500,
      mensaje: 'ERROR',
      error: err.message || 'Error interno'
    });
    res.status(err.status || 500).send("¡Algo salió mal!");
  });

  return { app, server };
}

recetas();
