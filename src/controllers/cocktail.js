const db = require('../models');
const Cocktail = db.Cocktail;
const subCocktail = db.subCocktail;
const Post = db.Post;

const getRandomCocktail = async () => {
    try {
        return Cocktail.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING RANDOM, ${error.message}`);
    }
};
const getByCategory = async (category) => {
    try {
        return subCocktail.findAll({ where: { category_FK: category } });
    } catch (error) {
        console.log(`ERROR AT BRINGING subCocktails, ${error.message}`);
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
        await Post.destroy({ where: { id } });
        return true;
    } catch (error) {
        console.error('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    getRandomCocktail,
    createCocktail,
    updateCocktail,
    deleteCocktail,
    getByCategory,
};
