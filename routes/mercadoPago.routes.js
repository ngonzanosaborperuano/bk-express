import * as mercadoPagoController from '../controllers/mercadopago.controller.js';

const mercadoPagoRoutes = (app, upload) => {
  app.post('/crear-preferencia', mercadoPagoController.crearPreferenciaController);
  app.post('/notificacion', mercadoPagoController.sendWebHooks);
  app.post('api/mercadoPago/webhook', mercadoPagoController.responseWebHooks);
};

export default mercadoPagoRoutes;
