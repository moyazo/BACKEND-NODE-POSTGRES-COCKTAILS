// const db = require("../models/index.js");
// const Rover = db.rover;
const Router = require('express').Router;
const randomRouter = Router();
const { getRandomCocktail } = require('../controllers/random');

/**
 * Description
 * @param {any} '/'
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
randomRouter.get('/', async (req, res) => {
    try {
        const random = await getRandomCocktail();
        (!random && res.status(403).json(`ERROR 403 'random'  NOT FOUND`)) ||
            res.status(200).json(random);
    } catch (error) {
        res.status(500).json(`ERROR 500, ${error.message}`);
    }
});

module.exports = randomRouter;