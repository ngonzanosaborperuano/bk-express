// services/mercadoPago.service.js
import dotenv from 'dotenv';
import mercadopago from 'mercadopago';

dotenv.config();

// Configura el token directamente
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const crearPreferenciaService = async ({ items }) => {
  const preference = {
    items: items['items'],
    back_urls: {
      success: "https://cocinando.shop/home",
      failure: "https://www.linkedin.com/feed/",
      pending: "https://www.google.com/",
    },
    payer: {
      name: "nilton",
      surname: "gonzano rojas",
      email: "niltongr@outlook.com",
      phone: {
        area_code: "51",
        number: 946352516
      },
      identification: {
        type: "DNI",
        number: "44830744"
      },
      address: {
        street_name: "urb rosaluz mzl1 lt10",
        street_number: 0,
        zip_code: "15117"
      },
      date_created: "2024-04-01T00:00:00Z"
    },

    payment_methods: {
      excluded_payment_types: [
        { id: "ticket" }, // Ejemplos: Pago Fácil, RapiPago, Boleto Bancário (en Brasil).
        { id: "atm" }, // cajeros automáticos. RedLink, Banelco (Argentina).
        { id: "bank_transfer" },// Transferencia bancaria directa
        { id: "digital_currency" } // Pagos con criptomonedas o monedas digitales.
      ],
      installments: 12,
      default_installments: 6,
    },
    auto_return: "approved",
    statement_descriptor: "Cocinando",
    external_reference: "1234567890",
    notification_url: "https://cocinando.shop/api/mercadoPago/webhook",
    binary_mode: true,

  };

  try {
    const result = await mercadopago.preferences.create(preference);
    return result.response;
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    throw error;
  }
};

export { crearPreferenciaService };
