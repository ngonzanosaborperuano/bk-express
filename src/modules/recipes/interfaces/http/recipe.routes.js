import recipesV1Router from '../../../../interfaces/http/v1/recipes.js';

export class RecipeRouter {
    async register(app, upload) {
        app.use('/api/v1', recipesV1Router);
    }
} 