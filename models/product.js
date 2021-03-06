'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    imagePath: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cart;
};