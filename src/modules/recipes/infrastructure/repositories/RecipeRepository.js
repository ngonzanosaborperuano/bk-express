import db from '../../../../db/connection.js';

export class RecipeRepository {
    async insertFullRecipe(recipeJson) {
        // Llama a la función SQL insert_full_recipe pasando el JSON como parámetro
        // y retorna el id de la receta insertada
        const result = await db.one(
            'SELECT insert_full_recipe($1::jsonb) AS id',
            [recipeJson]
        );
        return result.id;
    }
};
