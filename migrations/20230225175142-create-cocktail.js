'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cocktails', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            cocktail_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            cocktail_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isAlcoholic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            instructions: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ingredients: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            size: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_FK: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                references: {
                    model: 'Categories',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Cocktails');
    },
};
