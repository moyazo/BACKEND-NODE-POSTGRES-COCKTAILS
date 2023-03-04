const Router = require('express').Router;
const { apiCallByCategory } = require('../services/cocktailApi');
const { getCategories } = require('../controllers/category');
const {
    getCocktailList,
    getSubCocktailById,
} = require('../controllers/subCocktail');
const routerCategoryApi = Router();

routerCategoryApi.get('/sync', async (req, res) => {
    try {
        await apiCallByCategory();
        res.status(200).json('Data synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
routerCategoryApi.get('/', async (req, res) => {
    try {
        const categories = await getCategories();
        if (!categories) {
            res.status(403).json('NOT CATEGORIES FOUND');
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerCategoryApi;
