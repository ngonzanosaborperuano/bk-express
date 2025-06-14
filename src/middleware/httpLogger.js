import { guardarLog } from '../shared/utils/logger.js';

function sanitizarCuerpo(cuerpo) {
    if (!cuerpo || typeof cuerpo !== 'object') return cuerpo;
    const copia = JSON.parse(JSON.stringify(cuerpo));
    const camposSensibles = [
        'contrasena', 'password', 'pwd', 'pass', 'clave',
        'token', 'access_token', 'auth_token', 'refresh_token',
        'secret', 'client_secret', 'api_key', 'apikey', 'key',
        'pin', 'ssn', 'social_security_number', 'credit_card',
        'card_number', 'cvv', 'cvc', 'iban', 'swift', 'account_number',
        'email', 'phone', 'telefono', 'mobile', 'address', 'direccion',
        'dni', 'documento', 'passport', 'birthdate', 'dob',
        'location', 'coordinates', 'lat', 'lng'
    ];
    camposSensibles.forEach(campo => {
        if (campo in copia) copia[campo] = '********';
    });
    return copia;
}

export function requestLoggerMiddleware(req, res, next) {
    const start = process.hrtime();

    res.on('finish', async () => {
        const diff = process.hrtime(start);
        const tiempo = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
        const url = req.originalUrl;

        if (['/', '/logs', '/api/v1/docs'].some(p => url.startsWith(p))) return;

        if (res.statusCode < 500 && res.statusCode !== 304) {
            const mensajes = {
                200: 'OK',
                201: 'Created',
                202: 'Accepted',
                204: 'No Content',
                400: 'Bad Request',
                401: 'Unauthorized',
                403: 'Forbidden',
                404: 'Not Found',
                409: 'Conflict',
                422: 'Unprocessable Entity'
            };
            const mensaje = mensajes[res.statusCode] || 'Success or Client Error';
            try {
                await guardarLog({
                    metodo: req.method,
                    ruta: url,
                    cuerpo: sanitizarCuerpo(req.body),
                    respuesta_ms: tiempo,
                    estado_http: res.statusCode,
                    mensaje,
                    error: null
                });
            } catch (err) {
                console.error('Error al guardar log de respuesta:', err.message);
            }
        }
    });

    next();
}
