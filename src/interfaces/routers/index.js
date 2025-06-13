
import { LoggerRouter } from './logger.routes.js';
import { MpRoutes } from './mercadoPago.routes.js';
import { UserRouter } from './user.routes.js';


export class Routers {
    constructor() {
        this.routers = [
            new UserRouter(),
            new MpRoutes(),
            new LoggerRouter(),
        ];
    }

    async registerRoutes(app, upload) {
        for (const router of this.routers) {
            await router.register(app, upload);
        }
    }
}