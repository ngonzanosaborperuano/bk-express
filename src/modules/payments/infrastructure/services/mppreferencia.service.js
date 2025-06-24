import { config } from '../../../../config/config.js';
import mercadopago from '../../../../config/mercadopago.config.js';

const MP_HEADERS = {
  headers: {
    'X-Integrator-Id': config.mpIntegratorId
  }
};

export class MpPreferenciaService {

  constructor() { }
  async crearPreferenciaService({ items }) {
    const preference = {
      items,
      back_urls: {
        success: 'https://cocinando.shop/home',
        failure: 'https://cocinando.shop/home',
        pending: 'https://cocinando.shop/home',
      },
      payer: {
        name: 'Nilton',
        surname: 'Gonzano Rojas',
        email: 'niltongr@outlook.com',
        phone: {
          area_code: '51',
          number: 946352516,
        },
        identification: {
          type: 'DNI',
          number: '44830744',
        },
        address: {
          street_name: 'urb rosaluz mzl1 lt10',
          street_number: 0,
          zip_code: '15117',
        },
        date_created: '2024-04-01T00:00:00Z',
      },
      payment_methods: {
        excluded_payment_types: [
          { id: 'ticket' },
          { id: 'atm' },
          { id: 'bank_transfer' },
          { id: 'digital_currency' },
        ],
        // excluded_payment_methods: [
        //   { id: 'visa' },
        // ],
        installments: 6,
        default_installments: 1,
      },
      auto_return: 'approved',
      statement_descriptor: 'Cocinando',
      external_reference: '1234567890',
      notification_url: config.notification,
      binary_mode: true,
      metadata: {
        integrator_id: config.mpIntegratorId,
      },
    };

    try {
      const response = await mercadopago.preferences.create(preference, MP_HEADERS);

      return response.body;
    } catch (error) {
      console.error('[MercadoPagoService] Error al crear la preferencia:', error.message);
      throw new Error('No se pudo crear la preferencia de pago');
    }
  }

  async procesarWebhook(query, body) {
    try {
      const { id, topic, type } = query;

      console.log('[Webhook] ID:', id || body?.data?.id);
      console.log('[Webhook] Topic:', topic || body?.type);
      console.log('[Webhook] type:', type || body?.type);
      console.log('[Webhook] Payload:', JSON.stringify(body, null, 2));

      return { status: 'ok' };
    } catch (error) {
      console.error('[Webhook] Error procesando el webhook:', error.message);
      throw new Error('Error procesando webhook');
    }
  }

}