'use strict';
const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const postToCreate = [];
        for (var i = 0; i < 40; i++) {
            postToCreate.push({
                id: uuid.v4(),
                title: faker.name.first(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                ip: faker.internet.ip(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Posts', postToCreate, {});
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
