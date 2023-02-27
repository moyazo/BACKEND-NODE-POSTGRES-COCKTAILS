const Router = require('express').Router;
const { apiCallBySubCategory } = require('../services/cocktailApi');
const routerSubCategoryApi = Router();

routerSubCategoryApi.get('/:category', async (req, res) => {
    try {
        await apiCallBySubCategory(req.params.category);
        
        res.status(200).json('Data synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerSubCategoryApi;