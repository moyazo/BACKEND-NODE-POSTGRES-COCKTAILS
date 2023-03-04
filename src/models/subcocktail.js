'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class subCocktail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            subCocktail.hasOne(models.Category);
        }
    }
    subCocktail.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            cocktail_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cocktail_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
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
                }
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
            modelName: 'subCocktail',
        }
    );
    return subCocktail;
};
