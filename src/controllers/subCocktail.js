const db = require('../models');
const subCocktail = db.subCocktail;
const getCocktailList = async (category) => {
    try {
        const Cocktails = await subCocktail.findAll({where: {category:category}});
        return Cocktails;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    getCocktailList
}