import { PreferenciasController } from '../../interfaces/http/mppreferencia.controller.js';
import { SuscripcionController } from '../../interfaces/http/mpsuscripcion.controller.js';

export class MpRoutes {
  constructor() {
    this.suscripcion = new SuscripcionController();
    this.preferencia = new PreferenciasController();
  }

  async register(app) {
    app.post('/mp/preferencia', this.preferencia.create.bind(this.preferencia));
    app.post('/mp/notificacion', this.preferencia.sendWebHooks.bind(this.preferencia));
    app.post('/mp/webhook', this.preferencia.responseWebHooks.bind(this.preferencia));

    app.post('/mp/suscripcion', this.suscripcion.create.bind(this.suscripcion));
    app.get('/mp/suscripcion/:id', this.suscripcion.get.bind(this.suscripcion));
    app.put('/mp/suscripcion/:id', this.suscripcion.update.bind(this.suscripcion));
  }
}
