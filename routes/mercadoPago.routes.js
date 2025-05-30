import * as mercadoPagoController from '../controllers/mercadopago.controller.js';

const mercadoPagoRoutes = (app, upload) => {
  app.post('/crear-preferencia', mercadoPagoController.crearPreferenciaController);
  app.post('/notificacion', mercadoPagoController.enviarWebHooks);
};

export default mercadoPagoRoutes;
