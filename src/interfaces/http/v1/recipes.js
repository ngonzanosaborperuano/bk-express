import express from 'express';
import RecipeRepository from '../../../modules/recipes/infrastructure/repositories/RecipeRepository.js';

const router = express.Router();

// POST /recipes
router.post('/recipes', async (req, res) => {
    try {
        const recipeJson = req.body;
        const recipeId = await RecipeRepository.insertFullRecipe(recipeJson);
        res.status(201).json({ success: true, recipeId });
    } catch (error) {
        console.error('Error inserting recipe:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router; 