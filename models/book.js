'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: DataTypes.STRING,
    binding: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    publisher: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    summary: DataTypes.TEXT,
    title: DataTypes.STRING,
    fav_nums: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    models.Book.belongsTo(models.Photo);
    models.Book.hasMany(models.Comment)
  };
  return Book;
};