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
        console.log(`ERROR AT BRINGING subCocktails, ${error.message}`);
    }
};
/**
 * *createCocktail*
 * *This function creates a new Cocktail. First checks if the cocktail already exists. If not, it is created*
 * @param {JSON} newCocktail
 * @returns {Cocktail}
 */
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

/**
 * *updateCocktail*
 * *This function update the cocktail depending on the id given and the data the front-end wants to modify*
 * @param {String} id
 * @param {JSON} data
 * @returns {JSON}
 */
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
/**
 * *deleteCocktail*
 * *This function delete the cocktail depending on the id given*
 * @param {String} id
 * @returns {Boolean}
 */
const deleteCocktail = async (id) => {
    try {
        await Post.destroy({ where: { id } });
        return true;
    } catch (error) {
        console.error('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    createCocktail,
    updateCocktail,
    deleteCocktail,
    getByCategory,
};
