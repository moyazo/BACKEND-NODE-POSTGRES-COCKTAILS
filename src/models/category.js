'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.hasMany(models.Cocktail, {
                foreignKey: 'category_FK',
            });
            Category.hasMany(models.subCocktail, {
                foreignKey: 'category_FK',
            });
            Category.hasMany(models.Post, {
                foreignKey: 'category_FK',
            });
        }
    }
    Category.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        },
        {
            sequelize,
            modelName: 'Category',
        }
    );
    return Category;
};
