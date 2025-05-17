// services/mercadoPago.service.js
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

// Configura el token directamente
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const crearPreferenciaService = async ({ items }) => {
  const preference = {
    items: items['items'],
    back_urls: {
      success: "https://www.youtube.com/watch?v=qKEai3f6N3c",
      failure: "https://www.linkedin.com/feed/",
      pending: "https://www.google.com/",
    },
    auto_return: "approved",
    statement_descriptor: "RicoPE",
    payment_methods: {
      excluded_payment_types: [
        { "id": "ticket" }, // Ejemplos: Pago Fácil, RapiPago, Boleto Bancário (en Brasil).
        { "id": "atm" }, // cajeros automáticos. RedLink, Banelco (Argentina).
        { "id": "bank_transfer" },// Transferencia bancaria directa
        { "id": "digital_currency" } // Pagos con criptomonedas o monedas digitales.
      ],
      installments: 12
    }
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
