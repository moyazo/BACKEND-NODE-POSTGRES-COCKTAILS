'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.belongsToMany(models.User, {
                through: 'postUsers',
                as: 'UserPosts',
                foreignKey: 'post_FK',
            });
            Post.belongsToMany(models.User, {
                through: 'postUserFavorites',
                as: 'postsFavorites',
                foreignKey: 'post_favorite_FK',
            });
        }
    }
    Post.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
            },
            postCategory: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            comment: {
                type: DataTypes.STRING,
            },
            user_FK: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
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
            modelName: 'Post',
        }
    );
    return Post;
};
