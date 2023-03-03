const Router = require('express').Router;
const { apiCallByCategory } = require('../services/cocktailApi');
const { getCategories } = require('../controllers/category');
const routerCategoryApi = Router();

routerCategoryApi.get('/', async (req, res) => {
    try {
        await apiCallByCategory();
        const categories = await getCategories();
        if (!categories)
            res.status(403).json(`ERROR 403 'categories' NOT FOUND`);
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerCategoryApi;
