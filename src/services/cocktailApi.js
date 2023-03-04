const db = require('../models/index.js');
const Cocktail = db.Cocktail;
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
        console.log(error);
        console.log('THIS IS THE ERROR' + error.message);
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
        const newList = data.drinks.map((item) => ({
            category: item.strCategory,
        }));
        const categories = await Category.findAll();
        const itemsToCreate = [];

        for (let element of newList) {
            const existed = categories.find(
                (category) => category.cocktail_id === element.cocktail_id
            );
            if (!existed) {
                itemsToCreate.push(element);
            }
        }

        if (itemsToCreate.length > 0) {
            await Category.bulkCreate(itemsToCreate);
        }

        await apiCallBySubCategory();
    } catch (error) {
        console.log('THIS IS THE ERROR' + error.message);
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
        let categories = [];
        categoriesDb.forEach((element) => {
            categories.push(element.dataValues.category);
        });
        categories.forEach(async (category) => {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            const newList = data.drinks.map((item) => ({
                cocktail_id: item.idDrink,
                cocktail_name: item.strDrink,
                image: item.strDrinkThumb,
                category_FK: category.id,
            }));
            const subCocktails = await subCocktail.findAll();
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
        });
    } catch (error) {
        console.log('THIS IS THE ERROR' + error.message);
    }
}

module.exports = {
    apiCallRandom,
    apiCallBySubCategory,
    apiCallByCategory,
};
