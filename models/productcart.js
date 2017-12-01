'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductCart = sequelize.define('ProductCart', {
    totalPrice: DataTypes.NUMBER,
    totalQty: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductCart;
};