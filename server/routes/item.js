module.exports = function (app , controller) {
    app.post(controller.getUrl('/items'),controller.requireAuthentication, controller.item.create);
    app.post(controller.getUrl('/items/bulkCreate'),controller.requireAuthentication, controller.item.bulkCreate);
    app.get(controller.getUrl('/items') ,controller.requireAuthentication, controller.item.list);
    app.get(controller.getUrl('/items/:id'), controller.requireAuthentication,controller.item.retrieve);
    app.put(controller.getUrl('/items/:id'),controller.requireAuthentication, controller.item.update);
    app.delete(controller.getUrl('/items/:id'),controller.requireAuthentication, controller.item.destroy);
}