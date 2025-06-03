import { LogsService } from '../services/logger.service.js';
export class LogsController {
    constructor(logsService) {
        this.logsService = new LogsService();
    }

    async obtenerLogs(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 25;
            const metodo = req.query.metodo ? req.query.metodo.trim().toUpperCase() : null;
            const estado = req.query.estado ? parseInt(req.query.estado) : null;
            const respuesta = parseInt(req.query.respuesta) || 0;

            const logs = await this.logsService.listarLogs(limit, metodo, estado, respuesta);

            res.status(200).json({
                ok: true,
                total: logs.length,
                data: logs,
            });
        } catch (error) {
            console.error('Error en LogsController:', error);
            res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener los logs',
                error: error.message,
            });
        }
    }
}
