const Router = require('express').Router;
const { apiCallByCategory } = require('../services/cocktailApi');
const { getCategories } = require('../controllers/category');
const routerCategoryApi = Router();

/**
 * *SYNC ENDPOINT*
 * *This endpoint calls to our api in order to save the data in our DB*
 * *ENDPOINT* 'localhost:8000/categories/sync'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerCategoryApi.get('/sync', async (req, res) => {
    try {
        const isSynchronized = await apiCallByCategory();
        if (!isSynchronized) {
            res.status(502).json('Can not synchronize Categories');
        }
        res.status(200).json('Categories synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json(
            `Something went wrong at synchronize Categories ${error.message}`
        );
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
        res.status(500).json('Error at bring all categories' + error.message);
    }
});

// Esto solo trae el id de la categoría y el tipo. Esto os podría interesar pero si no borradlo
routerCategoryApi.get('/type', async (req, res) => {
    try {
        const categories = await getCategories();
        const type = categories.map((category) => {
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
