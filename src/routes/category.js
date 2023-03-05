const Router = require('express').Router;
const { apiCallByCategory } = require('../services/cocktailApi');
const { getCategories } = require('../controllers/category');
const {
    getCocktailList,
    getSubCocktailById,
} = require('../controllers/subCocktail');
const routerCategoryApi = Router();

/**
 * *SYNC ENDPOINT*
 * *This endpoint calls to our api in order to save the data in our DB*
 * *ENDPOINT* 'localhost:8000/categories/sync'
 * @param {Request} req
 * @param {Response} res
 * @returns {String}
 */
routerCategoryApi.get('/sync', async (req, res) => {
    try {
        await apiCallByCategory();
        res.status(200).json('Data synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

/**
 * *All CATEGORIES ENDPOINT*
 * *This endpoint calls to our DB and returns all the categories*
 * *ENDPOINT* 'localhost:8000/categories'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
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

routerCategoryApi.get('/type', async (req, res) => {
    try {
        const categories = await getCategories();
        let type = categories.map((category) => {
            return {
                id: category.id,
                category: category.category,
            };
        });
        if (!type) {
            res.status(403).json('NOT CATEGORIES FOUND');
        }
        res.status(200).json(type);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerCategoryApi;
