'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            title: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            comment: {
                type: Sequelize.STRING,
            },
            user_FK: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            category_FK: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
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
        await queryInterface.dropTable('Posts');
    },
};
