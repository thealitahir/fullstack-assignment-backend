module.exports = function (app , controller) {
    app.post(controller.getUrl('/carts'),controller.requireAuthentication, controller.cart.create);
    app.get(controller.getUrl('/carts/:id'), controller.requireAuthentication,controller.cart.retrieve);
    app.post(controller.getUrl('/carts/addToCart'), controller.requireAuthentication,controller.cart.addToCart);
    // app.put(controller.getUrl('/carts/:id'), controller.requireAuthentication ,controller.cart.update);
    // app.delete(controller.getUrl('/carts/:id'), controller.requireAuthentication , controller.cart.destroy);
    app.delete(controller.getUrl('/carts/deleteCartsItem/:cart_id/:item_id'), controller.requireAuthentication , controller.cart.deleteCartsItem);
    app.delete(controller.getUrl('/carts/emptyCart/:cart_id'), controller.requireAuthentication , controller.cart.emptyCart);
  };