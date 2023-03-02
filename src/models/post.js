'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
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
                defaultValue: DataTypes.UUIDV4,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            }
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
