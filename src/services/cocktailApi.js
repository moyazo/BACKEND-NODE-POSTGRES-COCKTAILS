const db = require('../models/index.js');
const subCocktail = db.subCocktail;
const Category = db.Category;

/**
 * *apiCallRandom*
 * *This function call to our api to get a random cocktail*
 * @returns {JSON}
 */
async function apiCallRandom() {
    try {
        const response = await fetch(
            'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        );
        const data = await response.json();
        const ourRandom = data.drinks.map((item) => ({
            cocktail_id: item.idDrink,
            cocktail_name: item.strDrink,
            category: item.strCategory,
            isAlcoholic: item.strAlcoholic,
            description: item.strInstructions,
            instrucctions: {
                de: item.strInstructionsDE,
                it: item.strInstructionsIT,
            },
            image: item.strDrinkThumb,
            ingredients: {
                one: item.strIngredient1,
                two: item.strIngredient2,
                three: item.strIngredient3,
                four: item.strIngredient4,
            },
        }));
        return ourRandom;
    } catch (error) {
        console.log('Error at sync Random' + error.message);
    }
}

/**
 * *apiCallByCategory*
 * *This function call to our api to get all type of categories to save them in our DB. It just synchronize the data*
 * @returns {any}
 */
async function apiCallByCategory() {
    try {
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
        );
        const data = await response.json();
        const categoriesResponse = data.drinks.map((item) => ({
            category: item.strCategory,
        }));
        const categoriesDB = await Category.findAll();
        const categoriesToCreate = [];

        for (let categoryResponse of categoriesResponse) {
            const existed = categoriesDB.find(
                (categoryDB) =>
                    categoryDB.category === categoryResponse.category
            );
            if (!existed) {
                categoriesToCreate.push(categoryResponse);
            }
        }

        if (categoriesToCreate.length > 0) {
            await Category.bulkCreate(categoriesToCreate);
        }

        await apiCallBySubCategory();
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * *apiCallBySubCategory*
 * *This function call to our CATEGORIES table from the DB and each category have a list of cocktails that are save in our DB*
 * *thanks to our api, this cocktails are save with the id of each category*
 * @returns {any}
 */
async function apiCallBySubCategory() {
    try {
        const categoriesDb = await Category.findAll();
        const subCocktails = await subCocktail.findAll();

        for (const categoryDb of categoriesDb) {
            const category = categoryDb.dataValues.category;
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            const newList = data.drinks.map((item) => ({
                cocktail_id: item.idDrink,
                cocktail_name: item.strDrink,
                image: item.strDrinkThumb,
                sub_cocktail_category_FK: categoryDb.dataValues.id,
            }));
            const itemsToCreate = [];
            for (let element of newList) {
                const existed = subCocktails.find(
                    (subCocktail) =>
                        subCocktail.cocktail_id === element.cocktail_id
                );
                if (!existed) {
                    itemsToCreate.push(element);
                }
            }
            if (itemsToCreate.length > 0) {
                await subCocktail.bulkCreate(itemsToCreate);
            }
        }
    } catch (error) {
        console.log('Error at sync subCocktail' + error.message);
    }
}

module.exports = {
    apiCallRandom,
    apiCallBySubCategory,
    apiCallByCategory,
};
