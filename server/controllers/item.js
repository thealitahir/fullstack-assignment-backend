const shortid = require("shortid");
var params = { tableName: "Item", body: {} };

list = (req, res) => {
  params.pagination = req.query.pagination;
  return req.db.list(req, res, params);
};
create = (req, res) => {
  req
    .checkBody(
      "name",
      "item Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  req.checkBody("price", "price must be a number").isFloat();
  req
    .checkBody(
      "category",
      "category name must be between 2 and 50 charactes in length"
    )
    .isLength({ min: 2, max: 50 });
  params.body = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    category: req.body.category,
    image: req.body.image,
    item_code: shortid.generate()
  };
  return req.db.create(req, res, params);
};

bulkCreate = (req, res) => {
  params.body = req.body;
  return req.db.bulkCreate(req,res, params);
};

update = (req, res) => {
  req
    .checkBody(
      "name",
      "Category Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  params.condition = {
    where: { created_by_id: req.body.id, id: req.params.id }
  };
  params.body = {
    name: req.body.name
  };
  return req.db.update(req, res, params);
};
retrieve = (req, res) => {
  params.body = { where: { created_by_id: req.body.id, id: req.params.id } };
  return req.db.retrieve(req, res, params);
};
destroy = (req, res) => {
  params.condition = {
    where: { created_by_id: req.body.id, id: req.params.id }
  };
  return req.db.destroy(req, res, params);
};

module.exports = {
  list: list,
  create: create,
  update: update,
  retrieve: retrieve,
  destroy: destroy,
  bulkCreate: bulkCreate
};
