"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartsItem = sequelize.define(
    "CartsItem",
    {
      item_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "cartsItems"
    }
  );
  CartsItem.associate = function(models) {
    // associations can be defined here
    CartsItem.userCart = CartsItem.belongsTo(models.Cart, {
      foreignKey: "cart_id"
    });
    CartsItem.item = CartsItem.belongsTo(models.Item, {
      foreignKey: "item_id"
    });
  };
  return CartsItem;
};
