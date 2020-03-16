module.exports = function (app , controller) {
    app.get(controller.getUrl('/users/:id'), controller.requireAuthentication,controller.user.retrieve);
    app.put(controller.getUrl('/users/:id'), controller.requireAuthentication ,controller.user.update);
    app.delete(controller.getUrl('/users/:id'), controller.requireAuthentication , controller.user.destroy);
  };