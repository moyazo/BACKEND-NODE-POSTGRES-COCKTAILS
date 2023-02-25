const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.POSTGRES_USER,
    process.env.POSTGRES_DB,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    }
);

module.exports = sequelize;
