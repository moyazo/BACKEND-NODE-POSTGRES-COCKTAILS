const db = require('../models');
const Cocktail = db.Cocktail;
const subCocktail = db.subCocktail;
const Post = db.Post;

/**
 * *getByCategory*
 * *This function call to all the subCocktails by id of a category from our DB*
 * @param {String} idCategory
 * @returns {JSON}
 */
const getByCategory = async (idCategory) => {
    try {
        return subCocktail.findAll({
            where: { sub_cocktail_category_FK: idCategory },
        });
    } catch (error) {
        console.log(`ERROR AT BRINGING subCocktails from DB, ${error.message}`);
    }
};

module.exports = {
    getByCategory,
};
