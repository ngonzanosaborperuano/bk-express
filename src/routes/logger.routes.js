import { LogsController } from '../controllers/logger.controller.js';
import { LogsService } from '../services/logger.service.js';

const logsService = new LogsService();
const logsController = new LogsController(logsService);

const loggerRoutes = (app, upload) => {
    app.get("/logs", logsController.obtenerLogs);
};

export default loggerRoutes;
