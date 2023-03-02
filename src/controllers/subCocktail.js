const db = require('../models');
const subCocktail = db.subCocktail;
const getCocktailList = async (category) => {
    try {
        const Cocktails = await subCocktail.findAll({
            where: { category: category },
        });
        return Cocktails;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const getSubCocktailById = async (id) => {
    try {
        const Cocktail = await subCocktail.findAll({
            where: { cocktail_id: id },
        });
        return Cocktail;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    getCocktailList,
    getSubCocktailById
};
