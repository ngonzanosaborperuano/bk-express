// config/config.js
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config({ path: '../.env' });
export const config = {
    secretOrKey: process.env.secretOrKey,
    mpIntegratorId: process.env.MP_INTEGRATOR_ID,
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    apiApp: process.env.API_APP,
    domain: process.env.DOMAIN,
    mpAccessToken: process.env.MP_ACCESS_TOKEN,
    portBD: process.env.port,
    portApp: process.env.PORT_APP,
    notification: process.env.NOTIFICATION_URL,
    backUrl: process.env.BACK_URL,
};
