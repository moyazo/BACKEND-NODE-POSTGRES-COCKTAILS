const db = require('../models');
const Category = db.Category;

const getCategories = async () => {
    try {
        return Category.findAll();
    } catch (error) {
        console.log(`ERROR AT BRINGING CATEGORIES, ${error.message}`);
    }
};

module.exports = {getCategories};
