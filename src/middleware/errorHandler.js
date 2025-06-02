import { guardarLog } from '../utils/logger.js';

export async function errorHandler(err, req, res, next) {
    const errorInfo = {
        mensaje: err.message,
        stack: err.stack,
        ...(err.code && { code: err.code }),
        ...(err.detail && { detalle: err.detail }),
        ...(err.constraint && { restriccion: err.constraint }),
        ...(err.query && { consulta: err.query }),
        ...(err.table && { tabla: err.table }),
        ...(err.schema && { esquema: err.schema }),
    };
    await guardarLog({
        metodo: req.method,
        ruta: req.originalUrl,
        cuerpo: req.body,
        respuesta_ms: 0,
        estado_http: err.status || 500,
        mensaje: 'ERROR',
        error: errorInfo,
    });

    res.status(err.status || 500).json({
        success: false,
        mensaje: 'Error interno del servidor',
    });
}
