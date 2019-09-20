'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        author: '[美]保罗·格雷厄姆',
        binding: "平装",
        categoryId: 1,
        photoId: 5,
        pages:264,
        price:49,
        publisher:"人民邮电出版社",
        subtitle:"硅谷创业之父Paul Grahamm 文集",
        summary:"这本书巴拉巴拉巴拉。。",
        title:"黑客与画家",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'MagnusLieHetland',
        binding: "平装",
        categoryId: 1,
        photoId: 6,
        pages:471,
        price:69,
        publisher:"人民邮电出版社",
        subtitle:"",
        summary:"这本书巴拉巴拉巴拉。。",
        title:"Python基础教程",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'MagnusLieHetland',
        binding: "精装",
        categoryId: 1,
        photoId: 6,
        pages:471,
        price:69,
        publisher:"人民邮电出版社",
        subtitle:"",
        summary:"这本书巴拉巴拉巴拉。。",
        title:"Python基础教程",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: '[日]岩井俊二',
        binding: "平装",
        categoryId: 2,
        photoId: 8,
        pages:256,
        price:18,
        publisher:"天津人民出版社",
        subtitle:"硅谷创业之父Paul Grahamm 文集",
        summary:"这本书巴拉巴拉巴拉。。",
        title:"情书",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
