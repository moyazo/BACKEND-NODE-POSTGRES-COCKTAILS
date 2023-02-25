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
        console.log(error.message);
    }
};

const getCocktailId = async (id) => {
    const CocktailId = await Cocktail.findByPk(id);
    return CocktailId;
};



const createCocktail = async (newCocktail) => {
    try {
        const exists = await Cocktail.findOne({ where: { cocktail_id: newCocktail.cocktail_id } });
        if (!exists) {
            const createCocktail = await Cocktail.create(newCocktail);
            return createCocktail;
        }
    } catch (error) {
        console.error(error);
    }
};

const updateCocktail = async (id, data) => {
    const CocktailUpdate = await Cocktail.update(data, {
        where: { id },
    });
    return CocktailUpdate;
};

const deleteCocktail = async (id) => {
    await Cocktail.destroy({ where: { id } });
    return true;
};

module.exports = {
    getRandomCocktail,
    getCocktailList,
    getCocktailId,
    createCocktail,
    updateCocktail,
    deleteCocktail,
};
