import * as mercadoPagoController from '../controllers/mercadopago.controller.js';
import SuscripcionControllers from '../controllers/mpsuscripcion.controller.js';

const ctrl = new SuscripcionControllers();

const mercadoPagoRoutes = (app, upload) => {
  app.post('/crear-preferencia', mercadoPagoController.crearPreferenciaController);
  app.post('/notificacion', mercadoPagoController.sendWebHooks);
  app.post('/api/mercadoPago/webhook', mercadoPagoController.responseWebHooks);

  app.post('/api/suscripcion', ctrl.createSuscription);
  app.get('/api/suscripcion/:id', ctrl.getSuscripcion);
  app.put('/api/suscripcion/:id', ctrl.updateSuscripcion);
};

export default mercadoPagoRoutes;
