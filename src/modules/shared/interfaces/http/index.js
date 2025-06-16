import { LoggerRouter } from '../../../logger/interfaces/http/logger.routes.js';
import { MpRoutes } from '../../../payments/interfaces/http/mercadoPago.routes.js';
import { PayURouter } from '../../../payments/interfaces/http/payU.routers.js';
import { RecipeRouter } from '../../../recipes/interfaces/http/recipe.routes.js';
import { UserRouter } from '../../../users/interfaces/http/user.routes.js';

export class Routers {
    constructor() {
        this.routers = [
            new UserRouter(),
            new MpRoutes(),
            new LoggerRouter(),
            new RecipeRouter(),
            new PayURouter()
        ];
    }

    async registerRoutes(app, upload) {
        for (const router of this.routers) {
            await router.register(app, upload);
        }
    }
}