const Router = require('express').Router;
const { apiCallRandom } = require('../services/cocktailApi');
const cocktailRouter = Router();
const { getByCategory } = require('../controllers/cocktail');

/**
 * *RANDOM ENDPOINT*
 * *This endpoint send to the front-end the data of a random cocktail of our api. We do not save it in our DB*
 * *ENDPOINT* 'localhost:8000/cocktails'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
cocktailRouter.get('/', async (req, res) => {
    try {
        const random = await apiCallRandom();
        if (!random) {
            res.status(403).json(`ERROR 403 'random'  NOT FOUND`);
        }
        res.status(200).json(random);
    } catch (error) {
        res.status(500).json('Error at bring random' + error.message);
    }
});
/**
 * *COCKTAIL BY ID ENDPOINT*
 * *This endpoint send to the front-end the data of a subCocktail by id of our DB*
 * *ENDPOINT* 'localhost:8000/cocktails/:idCategory'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
cocktailRouter.get('/:idCategory', async (req, res) => {
    try {
        const idCategory = req.params.idCategory;
        const subCocktails = await getByCategory(idCategory);
        if (!subCocktails) {
            res.status(403).json(`subCocktails NOT FOUND`);
        }
        res.status(200).json(subCocktails);
    } catch (error) {
        res.status(500).json('Error at bring subCocktails' + error.message);
    }
});

module.exports = cocktailRouter;
