const Router = require('express').Router;
const { apiCallRandom } = require('../services/cocktailApi');
const cocktailRouter = Router();
const {
    updateCocktail,
    deleteCocktail,
    createCocktail,
    getByCategory,
} = require('../controllers/cocktail');

/**
 * *RANDOM ENDPOINT*
 * *This endpoint send to the front-end the data of a random cocktail of our api. We do not save it in our DB*
 * *ENDPOINT* 'localhost:8000/cocktails/random'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
cocktailRouter.get('/random', async (req, res) => {
    try {
        const random = await apiCallRandom();
        if (!random) res.status(403).json(`ERROR 403 'random'  NOT FOUND`);

        res.status(200).json(random);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
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
        if (!subCocktails)
            res.status(403).json(`ERROR 403 'subCocktails'  NOT FOUND`);
        res.status(200).json(subCocktails);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

/**
 * *UPDATE COCKTAIL ENDPOINT*
 * *This endpoint allows to the front-end modify a cocktail from our DB*
 * *ENDPOINT* 'localhost:8000/cocktails/:cocktailId'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
cocktailRouter.put('/:cocktailId', async (req, res) => {
    try {
        const id = req.params.cocktailId;
        const newData = req.body;
        const Cocktails = await updateCocktail(id, newData);
        (!Cocktails &&
            res.status(403).json(`ERROR 403, can not update Cocktail ${id}`)) ||
            res.status(200).json(Cocktails);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR(500)' + error.message);
    }
});

/**
 * *DELETE COCKTAIL ENDPOINT*
 * *This endpoint allows to the front-end delete a cocktail from our DB*
 * *ENDPOINT* 'localhost:8000/cocktails/:cocktailId'
 * @param {Request} req
 * @param {Response} res
 * @returns {Boolean}
 */
cocktailRouter.delete('/:cocktailId', async (req, res) => {
    try {
        const id = req.params.cocktailId;
        const isDeleted = await deleteCocktail(id);
        if (!isDeleted) {
            res.status(403).json(`ERROR 403 can not delete Cocktail ${id}`);
        }
        res.status(200).json(Cocktails);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR(500)' + error.message);
    }
});
/**
 * *CREATE COCKTAIL ENDPOINT*
 * *This endpoint allows to the front-end create a cocktail and save it in our DB*
 * *ENDPOINT* 'localhost:8000/cocktails'
 * @param {Request} req
 * @param {Response} res
 * @returns {Boolean}
 */
cocktailRouter.post('/', async (req, res) => {
    try {
        const newCocktail = req.body;
        const Cocktail = await createCocktail(newCocktail);
        if (!Cocktail) {
            res.status(403).json(`ERROR 403 can not create Cocktail ${id}`);
        }
        res.status(200).json(Cocktail);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR(500)' + error.message);
    }
});

module.exports = cocktailRouter;
