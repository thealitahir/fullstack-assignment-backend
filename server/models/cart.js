"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      order_no: {
        allowNull: false,
        type: DataTypes.STRING
      },
      created_by_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          args: true,
          msg: "Cart already created!"
        },
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "carts"
    }
  );
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.cartUser = Cart.belongsTo(models.User, {
      foreignKey: "created_by_id"
    });
    Cart.cartItems = Cart.hasMany(models.CartsItem, {
      as:'cartsItems',
      foreignKey:'cart_id'
    });
  };
  Cart.beforeSave(function (cart, options) {
    
  });
  return Cart;
};
