const Router = require('express').Router;
const {apiCallRandom} = require('../services/cocktailApi');
const routerRandomApi = Router();

routerRandomApi.get('/', async (req, res) => {
    try {
        await apiCallRandom();
        res.status(200).json('Data synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found');
    }
});

module.exports = routerRandomApi;
