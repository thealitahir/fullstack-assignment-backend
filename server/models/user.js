"use strict";
const jwt = require("jsonwebtoken");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.js")[env];
var secret = config.secret;
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["M", "F"],
        validate: {
          isIn: {
            args: [["M", "F"]],
            msg: "Invalid user Gender."
          }
        }
      },
      address: {
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email address already in use!"
        },
        validate: {
          len: {
            args: [6, 128],
            msg: "Email address must be between 6 and 128 characters in length"
          },
          isEmail: {
            msg: "Email address must be valid"
          }
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [6, Infinity]
        }
      }
    },
    {
      indexes: [{ unique: true, fields: ["email"] }],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "users"
    }
  );
  User.prototype.authenticate = function authenticate(value) {
    if (bcrypt.compareSync(value, this.password)) return this;
    else return false;
  };
  User.associate = function(models) {};
  User.prototype.generateJwtToken = function generateJwtToken() {
    console.log("generate jwt", secret);
    return jwt.sign({ email: this.email, id: this.id }, secret);
  };
  return User;
};
