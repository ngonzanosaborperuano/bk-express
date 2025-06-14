import { obtenerLogs } from '../../../../shared/utils/logger.js'; // o donde esté la función

export class LogsService {
    async listarLogs(limit = 25, metodo = null, estado = null, respuesta = 0) {
        const logs = await obtenerLogs(limit, metodo, estado, respuesta);
        return logs;
    }
}
