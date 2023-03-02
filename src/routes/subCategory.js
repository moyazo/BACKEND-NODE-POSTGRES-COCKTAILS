const Router = require('express').Router;
const { apiCallBySubCategory } = require('../services/cocktailApi');
const { getCocktailList,getSubCocktailById } = require('../controllers/subCocktail');
const routerSubCategoryApi = Router();

routerSubCategoryApi.get('/:category', async (req, res) => {
    try {
        await apiCallBySubCategory(req.params.category);
        const cocktails = await getCocktailList(req.params.category);
        if (!cocktails) res.status(403).json(`ERROR 403 'cocktails' NOT FOUND`);
        res.status(200).json(cocktails);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerSubCategoryApi.get('/subCocktail/:subCocktailId', async (req, res) => {
    try {
        if(!req.params.subCocktailId) res.status(403).json(`ERROR 403 'subCocktailId' NOT FOUND`);
        const idSubCocktail = req.params.subCocktailId;
        const cocktail = await getSubCocktailById(idSubCocktail);
        if (!cocktail) res.status(403).json(`ERROR 403 'SubCocktail' NOT FOUND`);
        res.status(200).json(cocktail);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerSubCategoryApi;
