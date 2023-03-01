const db = require('../models');
const Cocktail = db.Cocktail;

const getRandomCocktail = async () => {
    try {
        return Cocktail.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING RANDOM, ${error.message}`);
    }
};

const getCocktailList = async () => {
    try {
        const CocktailList = await Cocktail.findAll();
        return CocktailList;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const getCocktailId = async (id) => {
    try {
        const CocktailId = await Cocktail.findByPk(id);
        return CocktailId;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const getCocktailLetter = async (letter) => {
    try {
        const CocktailId = await Cocktail.findAll({
            where: { cocktail_name: `^${letter}` },
        });
        return CocktailId;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const createCocktail = async (newCocktail) => {
    try {
        const exists = await Cocktail.findOne({
            where: { cocktail_id: newCocktail.cocktail_id },
        });
        if (!exists) {
            const createCocktail = await Cocktail.create(newCocktail);
            return createCocktail;
        }
    } catch (error) {
        console.error('THIS IS HT ERROR, ' + error.message);
    }
};

const updateCocktail = async (id, data) => {
    try {
        const CocktailUpdate = await Cocktail.update(data, {
            where: { id },
        });
        return CocktailUpdate;
    } catch (error) {
        console.error('THIS IS HT ERROR, ' + error.message);
    }
};

const deleteCocktail = async (id) => {
    try {
        await Cocktail.destroy({ where: { id } });
        return true;
    } catch (error) {
        console.error('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    getRandomCocktail,
    getCocktailList,
    getCocktailId,
    createCocktail,
    updateCocktail,
    deleteCocktail,
    getCocktailLetter,
};
