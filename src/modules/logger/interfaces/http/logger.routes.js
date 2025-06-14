import { LogsController } from '../../interfaces/http/logger.controller.js';
export class LoggerRouter {
    constructor() {
        this.logsController = new LogsController();
    }

    async register(app) {
        app.get("/logs", this.logsController.obtenerLogs.bind(this.logsController));
    }

}
