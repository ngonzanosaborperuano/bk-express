
import mercadopago from 'mercadopago';
import { config } from '../config/config.js';
// dotenv.config();
mercadopago.configure({
    access_token: config.mpAccessToken
});

export default mercadopago;