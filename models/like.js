'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    useId: DataTypes.INTEGER,
    musicId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    models.Like.belongsTo(models.Music);
    models.Like.belongsTo(models.User);
  };
  return Like;
};