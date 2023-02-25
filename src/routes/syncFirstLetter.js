const Router = require('express').Router;
const {apiCallByFirstLetter} = require('../services/cocktailApi');
const routerFirstLetterApi = Router();

routerFirstLetterApi.get('/', async (req, res) => {
    try {
        await apiCallByFirstLetter();
        res.status(200).json('Data synchronize successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found');
    }
});

module.exports = routerFirstLetterApi;
