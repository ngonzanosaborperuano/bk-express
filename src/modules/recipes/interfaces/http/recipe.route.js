import { RateLimiters } from '../../../../middleware/applySensitiveRateLimiters.js';
import { AppCheckService } from '../../../../middleware/verificarAppCheck.js';
import { RecipeController } from './recipe.controller.js';

export class RecipeRouter {
    constructor() {
        this.controller = new RecipeController();
        this.rateLimiters = new RateLimiters();
        this.appCheck = new AppCheckService();
    }

    async register(app) {
        await app.post('/recipe',
            //passport.authenticate("jwt", { session: false }),
            //this.appCheck.verificar.bind(this.appCheck),
            this.controller.createRecipe.bind(this.controller),
        );
    }
} 