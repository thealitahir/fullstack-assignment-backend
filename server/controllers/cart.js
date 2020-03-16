const db = require("../config/db");
const models = require("../models");
var cartParams = { tableName: "Cart", body: {} };
var itemParams = { tableName: "Item", body: {} };
var cartItemParams = { tableName: "CartsItem", body: {} };
const shortid = require("shortid");
const User = models.User;

create = (req, res) => {
  console.log("in create cart");
  /* req
    .checkBody(
      "name",
      "Course Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 }); */
  cartParams.body = {
    order_no: shortid.generate(),
    created_by_id: req.user.id
  };
  /* params.include = {
    include: [
      {
        model: models.Item,
        as: "items"
      }
    ]
  }; */
  console.log(cartParams.body);
  return req.db.create(req, res, params);
};

retrieve = (req, res) => {
  console.log(models.CartsItem.userCart);
  cartParams.body = {
    where: { id: req.params.id },
    include: [
      User,
      {
        association: models.Cart.cartItems,
        User,
        include: [{ association: models.CartsItem.item }]
      }
    ]
  };
  return req.db.retrieve(req, res, cartParams);
};

addToCart = (req, res) => {
  cartParams.body = {
    where: { created_by_id: req.user.id }
  };
  itemParams.body = {
    where: { id: req.body.item_id }
  };
  return req.db.retrieve(req, res, itemParams, item => {
    console.log(item);
    if (item) {
      return req.db.retrieve(req, res, cartParams, async cart => {
        console.log(item);
        if (!cart) {
          cartParams.body = {
            order_no: shortid.generate(),
            created_by_id: req.user.id
          };
          req.db.create(req, res, cartParams, async new_cart => {
            if (new_cart) {
              await models.CartsItem.create({
                cart_id: new_cart.dataValues.id,
                item_id: item.dataValues.id,
                item_quantity: req.body.item_quantity
              });
              return res.status(200).send({
                success: true,
                data: item,
                message: "Item added successfully"
              });
            } else {
              return req.db.sendError(
                {
                  code: 422,
                  message: "Unable to create item cart entry"
                },
                res
              );
            }
          });
        } else {
          console.log(">>>>", cart.dataValues.id);
          console.log(">>>>", item.dataValues.id);
          var a = await models.CartsItem.create({
            cart_id: cart.dataValues.id,
            item_id: item.dataValues.id,
            item_quantity: req.body.item_quantity
          });
          return res.status(200).send({
            success: true,
            data: a,
            message: "Item added successfully"
          });
        }
      });
    } else {
      return req.db.sendError(
        {
          code: 422,
          message: "Unable to fetch cart in add item"
        },
        res
      );
    }
  });
};

deleteCartsItem = (req, res) => {
  console.log(req.params);
  cartItemParams.condition = {
    where: { cart_id: req.params.cart_id, item_id: req.params.item_id }
  };
  return req.db.destroy(req, res, cartItemParams);
};

emptyCart = (req, res) => {
  console.log(req.params);
  cartItemParams.condition = {
    where: { cart_id: req.params.cart_id }
  };
  return req.db.destroy(req, res, cartItemParams);
};
module.exports = {
  create: create,
  retrieve: retrieve,
  addToCart: addToCart,
  deleteCartsItem: deleteCartsItem,
  emptyCart: emptyCart
};
