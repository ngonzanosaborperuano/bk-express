export class LogsController {
    constructor(logsService) {
        this.logsService = logsService;

        // Asegura el binding del método para usarlo como handler Express
        this.obtenerLogs = this.obtenerLogs.bind(this);
    }

    async obtenerLogs(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 25;
            const metodo = req.query.metodo ? req.query.metodo.trim().toUpperCase() : null;
            const estado = req.query.estado ? parseInt(req.query.estado) : null;

            const logs = await this.logsService.listarLogs(limit, metodo, estado);


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
