const Router = require('express').Router;
const { apiCallRandom } = require('../services/cocktailApi');
const cocktailRouter = Router();
const {
    getCocktailList,
    getCocktailId,
    updateCocktail,
    deleteCocktail,
    createCocktail,
    getCocktailLetter,
} = require('../controllers/cocktail');

/**
 * Description
 * @param {any} '/'
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
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

cocktailRouter.delete('/:cocktailId', async (req, res) => {
    try {
        const id = req.params.cocktailId;
        const Cocktails = await deleteCocktail(id);
        (!Cocktails &&
            res.status(403).json(`ERROR 403 can not delete Cocktail ${id}`)) ||
            res.status(200).json(Cocktails);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR(500)' + error.message);
    }
});

cocktailRouter.post('/', async (req, res) => {
    try {
        const newCocktail = req.body;
        const Cocktails = await createCocktail(newCocktail);
        (!Cocktails &&
            res.status(403).json(`ERROR 403 can not create Cocktail ${id}`)) ||
            res.status(200).json(Cocktails);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR(500)' + error.message);
    }
});

module.exports = cocktailRouter;
