import { config } from '../../config/config.js';
import mercadopago from '../../config/mercadopago.config.js';
import { DatosPagos } from '../../domain/entities/DatosPagos.entities.js';


const MP_HEADERS = {
    headers: {
        'X-Integrator-Id': config.mpIntegratorId
    }
};

export default class SucripcionService {
    constructor() { }

    async find(id) {
        try {
            const response = await mercadopago.preapproval.get(id, MP_HEADERS);
            console.log(response.body);
            return response.body;
            // return response.data;
        } catch (error) {
            const err = new Error(error.message || 'Error al actualizar la suscripción');
            err.status = error.status || 500;
            throw err;
        }
    }

    async create(body) {
        try {
            const datosPagos = new DatosPagos({
                reason: body.reason,
                payerEmail: body.payer_email,
                backUrl: body.back_url,
                notificationUrl: body.notification_url,
                autoRecurring: {
                    frequency: body.auto_recurring.frequency,
                    frequencyType: body.auto_recurring.frequency_type,
                    transactionAmount: body.auto_recurring.transaction_amount,
                    currencyId: body.auto_recurring.currency_id
                }
            });
            const bodyMp = datosPagos.toMPDatosPagosFormat();

            const response = await mercadopago.preapproval.create(bodyMp, MP_HEADERS);
            return response.body;
        } catch (error) {
            const err = new Error(error.message || 'Error al actualizar la suscripción');
            err.status = error.status || 500;
            throw err;
        }

    }

    async update(id, precio) {
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
