import { MpPreferenciaService } from '../services/mppreferencia.service.js';

export class PreferenciasController {
  constructor() {
    this.preferenciaService = new MpPreferenciaService();
  }
  async create(req, res, next) {
    try {
      const { items } = req.body;
      const result = await this.preferenciaService.crearPreferenciaService({ items });
      res.status(200).json({
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point
      });
    } catch (error) {
      next(error)
    }
  }
  async sendWebHooks(req, res, next) {
    try {
      const items = req.body;
      res.status(200).send('ok');

      // const result = await crearPreferenciaService({ items });

      // console.log('✅ Preferencia creada:', result.init_point);

      // res.status(200).json({
      //   id: result.id,
      //   init_point: result.init_point,
      //   sandbox_init_point: result.sandbox_init_point
      // });
    } catch (error) {
      next(error)
      // console.error('❌ Error al crear preferencia:', error);
      // res.status(500).json({ error: error.message });
    }
  }
  async responseWebHooks(req, res, next) {
    try {
      console.log('[Webhook recibido] Query:', req.query);
      console.log('[Webhook recibido] Body:', req.body);
      const result = await this.preferenciaService.procesarWebhook(req.query, req.body);
      res.status(200).json(result);

    } catch (error) {
      next(error)
    }
  }
};
