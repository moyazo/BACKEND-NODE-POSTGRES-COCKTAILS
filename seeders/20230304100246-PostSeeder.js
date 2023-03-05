'use strict';
const uuid = require('uuid');
const db = require('../src/models/index.js');
const Category = db.Category;
const User = db.User;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let postToCreate = [];
        let categoriesToCreate = [];
        let idCategories = [];
        const Categories = await Category.findAll();
        const Users = await User.findAll();
        Categories.forEach((category) => {
            categoriesToCreate.push(category.category);
            idCategories.push(category.id);
        });
        const usersId = Users.map((user) => user.id);
        const images = [
            'https://www.tastingtable.com/img/gallery/11-cocktails-to-try-if-you-like-drinking-gin/intro-1659025591.jpg',
            'https://thumbs.dreamstime.com/b/set-various-cocktails-black-background-set-various-cocktails-shaker-black-background-188649840.jpg',
            'https://hips.hearstapps.com/del.h-cdn.co/assets/15/24/1434133241-milkshakes.jpg',
            'https://japanese-clothing.com/wp-content/uploads/2022/06/Sans_titre_-_2020-05-17T154130.995_1.jpg?v=1589722950',
            'https://recipe4appetite.com/img/recipe-img/homemade-cocoa-drink.jpg',
            'https://149694725.v2.pressablecdn.com/wp-content/uploads/2018/03/Popular-Shot-Recipes.jpg',
            'https://www.getflavor.com/wp-content/uploads/2021/09/Latte-and-Tea-Mojito-1152.jpg',
            'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/200615BBCGOODFOODCOVERVEGXMASCOVER202004592-copy-95936cf.jpg',
            'https://petersfoodadventures.com/wp-content/uploads/2018/12/christmas-punch-1.png',
            'https://cdn2.justwineapp.com/assets/article/2017/01/Bier-Cocktail-Pale-Ale-darkrye-com.jpg',
            'https://dosaandcurry.ca/wp-content/uploads/2021/11/Soft-Drinks.jpg',
        ];
        for (var i = 0; i < 11; i++) {
            postToCreate.push({
                id: uuid.v4(),
                title: 'post test' + (i + 1),
                postCategory: categoriesToCreate[i],
                image: images[i],
                comment: 'comment test',
                user_FK: usersId[i],
                category_FK: idCategories[i],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Posts', postToCreate, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
