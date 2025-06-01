import http from 'http';

export function createHttpRedirect(port = 80) {
    http.createServer((req, res) => {
        res.writeHead(301, {
            Location: `https://${req.headers.host}${req.url}`,
        });
        res.end();
    }).listen(port, () => {
        console.log(`🌐 Redireccionando HTTP → HTTPS en puerto ${port}`);
    });
}
