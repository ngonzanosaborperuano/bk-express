import https from 'https';

export function createHttpsServer(credentials, app, port = 443) {
    https.createServer(credentials, app).listen(port, () => {
        console.log(`✅ Servidor HTTPS escuchando en puerto ${port}`);
    });
}
