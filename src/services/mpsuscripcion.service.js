import { config } from '../config/config.js';
import mercadopago from '../config/mercadopago.config.js';

const MP_HEADERS = {
    headers: {
        'X-Integrator-Id': config.mpIntegratorId
    }
};

export default class SucripcionService {
    constructor() { }

    async findSuscripcion(id) {
        try {
            const response = await mercadopago.preapproval.get(id, MP_HEADERS);
            return response.body;
            // return response.data;
        } catch (error) {
            const err = new Error(error.message || 'Error al actualizar la suscripción');
            err.status = error.status || 500;
            throw err;
        }
    }

    async createSuscription(body) {
        try {
            const bodyMp = {
                reason: body.title,//Plan mensual premium
                auto_recurring: {
                    frequency: 1,//una vez al mes
                    frequency_type: "months",
                    transaction_amount: body.precio,
                    currency_id: "PEN",
                    start_date: new Date(body.fecha_inicio).toISOString(),
                    end_date: new Date(body.fecha_fin).toISOString(),
                },
                back_url: "https://www.linkedin.com/in/nilton-gonzano-rojas-59aaaa132/",
                notification_url: "https://cocinando.shop/api/mercadoPago/webhook",
                payer_email: "niltongr@outlook.com",
            };

            const response = await mercadopago.preapproval.create(bodyMp, MP_HEADERS);
            return response.body;
        } catch (error) {
            const err = new Error(error.message || 'Error al actualizar la suscripción');
            err.status = error.status || 500;
            throw err;
        }

    }

    async updateSuscription(id, precio) {
        try {
            const bodyMp = {
                auto_recurring: {
                    transaction_amount: precio,
                },
            };

            const response = await mercadopago.preapproval.update(id, bodyMp, MP_HEADERS);

            return response.body;
        } catch (error) {
            const err = new Error(error.message || 'Error al actualizar la suscripción');
            err.status = error.status || 500;
            throw err;
        }
    }
}
