import { obtenerLogs } from '../utils/logger.js'; // o donde esté la función

export class LogsService {
    async listarLogs(limit = 25, metodo = null, estado = null) {
        const logs = await obtenerLogs(limit, metodo, estado);
        return logs;
    }
}
