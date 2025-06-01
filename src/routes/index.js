// src/routes/index.js
import mercadoPago from './mercadoPago.routes.js';
import users from './user.routes.js';

export function registerRoutes(app, upload) {
    users(app, upload);
    mercadoPago(app);
}
