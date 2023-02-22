// const db = require('../models');
// const Rover = db.rover

const getRandomCocktail = async () => {
    try {
        return Random.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING RANDOM, ${error.message}`);
    }
};

module.exports = { getRandomCocktail };
