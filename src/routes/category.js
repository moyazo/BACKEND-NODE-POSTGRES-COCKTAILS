const Router = require('express').Router;
const {
    apiCallByCategory,
} = require('../services/cocktailApi');
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

module.exports = routerCategoryApi;
