'use strict';
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    url: DataTypes.STRING,
    content: DataTypes.TEXT,
    fav_num: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Music.associate = function(models) {
    models.Music.belongsTo(models.Photo);
    //music里面的photoId属于photo 所以music属于photo
    models.Music.hasMany(models.Like);

  };
  return Music;
};