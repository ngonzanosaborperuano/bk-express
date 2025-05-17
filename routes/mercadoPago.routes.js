import passport from 'passport';
import * as mercadoPagoController from '../controllers/mercadopago.controller.js';

const mercadoPagoRoutes = (app, upload) => {
  app.post('/crear-preferencia', mercadoPagoController.crearPreferenciaController);
};

export default mercadoPagoRoutes;
