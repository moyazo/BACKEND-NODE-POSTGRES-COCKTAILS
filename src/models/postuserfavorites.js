'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class postUserFavorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            postUserFavorites.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user',
            });
            postUserFavorites.belongsTo(models.Post, {
                foreignKey: 'id',
                as: 'post',
            });
        }
    }
    postUserFavorites.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            user_favorites_FK: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            post_favorite_FK: {
                type: DataTypes.UUID,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName: 'postUserFavorites',
        }
    );
    return postUserFavorites;
};
