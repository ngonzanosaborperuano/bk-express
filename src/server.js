import http from 'http';
import { AppFactory } from './app.js'; // asegúrate de que `app.js` exporta la clase
import { config } from './config/config.js';

async function startServer() {
    const appFactory = new AppFactory();
    const app = await appFactory.init(); // método init de tu clase AppFactory

    const port = process.env.PORT || 3000;
    app.set('port', port);

    const host = config.apiApp || 'localhost';

    const server = http.createServer(app);

    server.listen(port, host, () => {
        console.log(`✅ IP: ${host}`);
        console.log(`✅ App PID: ${process.pid}`);
        console.log(`✅ Listening on port: ${port}`);
    });

    return { app, server };
}

startServer();
