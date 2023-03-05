'use strict';
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const saltRounds = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let usersToCreate = [];

        for (let i = 1; i < 11; i++) {
            const password = `test12345${i}`;
            const email = `test12345${i}@gmail.com`;
            const name = `test12345${i}`;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {
                id: uuid.v4(),
                email,
                password: hashedPassword,
                name,
                salt,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            usersToCreate.push(user);
        }
        await queryInterface.bulkInsert('Users', usersToCreate, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
