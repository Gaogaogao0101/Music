'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
        image: 'http://bl.7yue.pro/images/music.7.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'http://bl.7yue.pro/images/music.3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
