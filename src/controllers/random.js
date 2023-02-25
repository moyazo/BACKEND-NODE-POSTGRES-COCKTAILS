const db = require('../models');
const Cocktail = db.Cocktail

const getRandomCocktail = async () => {
    try {
        return Cocktail.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING RANDOM, ${error.message}`);
    }
};

module.exports = { getRandomCocktail };
