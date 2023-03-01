const Router = require('express').Router;
const { apiCallBySubCategory } = require('../services/cocktailApi');
const { getCocktailList } = require('../controllers/subCocktail');
const routerSubCategoryApi = Router();

routerSubCategoryApi.post('/:category', async (req, res) => {
    try {
        await apiCallBySubCategory(req.params.category);
        const cocktails = await getCocktailList(req.params.category);
        if (!cocktails)
            res.status(403).json(`ERROR 403 'cocktails' NOT FOUND`);
        res.status(200).json(cocktails);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerSubCategoryApi;
