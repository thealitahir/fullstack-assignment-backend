"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.INTEGER
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      rating: {
        type: DataTypes.FLOAT
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING
      },
      item_code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "items"
    }
  );
  // Item.associate = function(models) {
  //   // associations can be defined here
  // };
  return Item;
};
