import http from 'http';
import { createApp } from './app.js';
import { config } from './config/config.js';

async function startServer() {
    const app = await createApp();

    const port = process.env.PORT || 3000;
    app.set('port', port);

    const host = config.apiApp || 'localhost';

    const server = http.createServer(app);

    server.listen(port, host, () => {
        console.log(`IP ${host} iniciada...`);
        console.log(`App ${process.pid} iniciada...`);
        console.log(`Port ${port} iniciada...`);
    });

    return { app, server };
}

startServer();
