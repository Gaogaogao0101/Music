'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    image: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
  };
  return Photo;
};