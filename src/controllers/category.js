const db = require('../models');
const Category = db.Category;

/**
 * *getCategories*
 * *This function call to all the categories from our DB*
 * miss return
 */
const getCategories = async () => {
    try {
        return Category.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING CATEGORIES, ${error.message}`);
    }
};

module.exports = { getCategories };
