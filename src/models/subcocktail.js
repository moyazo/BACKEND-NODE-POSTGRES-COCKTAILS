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
            subCocktail.belongsTo(models.Category, {
                foreignKey: 'id',
                as: 'category',
            });
        }
    }
    subCocktail.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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
            sub_cocktail_category_FK: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            modelName: 'subCocktail',
        }
    );
    return subCocktail;
};
