const db = require('../models/index.js');
const Cocktail = db.Cocktail
async function apiCallCocktails() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    // "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" + process.env.API_KEY
    const data = await response.json();
    const ourRandom = data.drinks.map((item) => ({
        cocktail_id: item.idDrink,
        cocktail_name: item.strDrink,
        category: item.strCategory,
        isAlcoholic: item.strAlcoholic,
        instructions: item.strInstructions,
        strInstructions: item.strInstructions,
        image: item.strDrinkThumb,
        ingredients:item.strIngredient1+','+
                    item.strIngredient2+','+
                    item.strIngredient3+','+
                    item.strIngredient4+','+
                    item.strIngredient5+','+
                    item.strIngredient6+','+
                    item.strIngredient7,
        size:item.strMeasure1+','+
        item.strMeasure2+','+
        item.strMeasure3+','+
        item.strMeasure4+','+
        item.strMeasure5+','+
        item.strMeasure6,
    }));
    await Cocktail.destroy({where:{}});
    await Cocktail.create(ourRandom[0]);
}


module.exports = apiCallCocktails;