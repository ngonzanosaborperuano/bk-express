import { RecipeRepository } from '../../infrastructure/repositories/RecipeRepository.js';

export class RecipeController {
    constructor() {
        this.recipeRepository = new RecipeRepository();
    }

    async createRecipe(req, res, next) {
        try {
            const id = await this.recipeRepository.insertFullRecipe(req.body);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
}
