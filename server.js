import express from 'express';
import admin from 'firebase-admin';
import fs from 'fs';
import http from 'http';
import multer from 'multer';
import path from 'path';
import socketio from 'socket.io'; // ✅ IMPORTACIÓN CORRECTA para ESM + CommonJS
import { guardarLog } from './utils/logger.js';


const { Server: SocketIOServer } = socketio;

import { applyMiddlewares } from './middleware/appMiddlewares.js';
import mercadoPago from './routes/mercadoPago.routes.js';
import users from './routes/user.routes.js';
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

  applyMiddlewares(app);

  /* Rutas */
  const port = process.env.PORT_APP || 3000;
  app.set("port", port);

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
    console.log("ip " + host + " iniciada...");
    console.log("App " + process.pid + " iniciada...");
    console.log("Port " + port + " iniciada...");
  });

  // Middleware global para manejo de errores
  app.use(async (err, req, res, next) => {
    const errorInfo = {
      mensaje: err.message,
      stack: err.stack,
      ...(err.code && { code: err.code }),
      ...(err.detail && { detalle: err.detail }),
      ...(err.constraint && { restriccion: err.constraint }),
      ...(err.query && { consulta: err.query }),
      ...(err.table && { tabla: err.table }),
      ...(err.schema && { esquema: err.schema }),
    };
    await guardarLog({
      metodo: req.method,
      ruta: req.originalUrl,
      cuerpo: req.body,
      respuesta_ms: 0,
      estado_http: err.status || 500,
      mensaje: 'ERROR',
      error: errorInfo
    });
    res.status(err.status || 500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    });
  });

  return { app, server };
}

recetas();
