// controllers/mercadoPago.controller.js
import { crearPreferenciaService } from '../services/mercadoPago.service.js';

export const crearPreferenciaController = async (req, res) => {
  try {
    const items = req.body;

    const result = await crearPreferenciaService({ items });

    console.log('✅ Preferencia creada:', result.init_point);

    res.status(200).json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error) {
    next(error)
    // console.error('❌ Error al crear preferencia:', error);
    // res.status(500).json({ error: error.message });
  }
};
