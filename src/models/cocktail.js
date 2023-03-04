'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cocktail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Cocktail.belongsToMany(models.User, {
            //     through: 'cocktailUser',
            //     as: 'CocktailUsers',
            //     foreignKey: 'cocktail_FK',
            // });
            Cocktail.hasOne(models.Category);
        }
    }
    Cocktail.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            cocktail_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cocktail_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAlcoholic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            instructions: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category_FK: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Cocktail',
        }
    );
    return Cocktail;
};
