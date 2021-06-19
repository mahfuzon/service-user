'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'admin@gmail.com',
      profession: 'Web Developer',
      role: 'admin',
      password: await bcrypt.hash('admin', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Doe',
      email: 'student@gmail.com',
      profession: 'Web Developer',
      role: 'student',
      password: await bcrypt.hash('student', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};