import http from 'http';
import { config } from '../config/config.js';
import { AppFactory } from './app.js'; // asegúrate de que `app.js` exporta la clase

async function startServer() {
    const appFactory = new AppFactory();
    const app = await appFactory.init(); // método init de tu clase AppFactory

    const port = config.portApp || 3001;
    app.set('port', port);

    const host = config.apiApp || '0.0.0.0';

    const server = http.createServer(app);

    server.listen(port, host, () => {
        console.log(`✅ IP: ${host}`);
        console.log(`✅ App PID: ${process.pid}`);
        console.log(`✅ Listening on port: ${port}`);
    });

    return { app, server };
}

startServer();
