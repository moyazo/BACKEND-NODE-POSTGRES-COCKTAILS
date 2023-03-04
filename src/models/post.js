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
            Post.hasOne(models.Category);
        }
    }
    Post.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            title: {
                type: DataTypes.STRING,
            },
            category: {
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
            },
            category_FK: {
                allowNull: false,
                type: DataTypes.UUID,
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
            modelName: 'Post',
        }
    );
    return Post;
};
