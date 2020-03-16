const db = require("../config/db");
var params = { tableName: "User", body: {} };

retrieve = (req, res) => {
  req
    .checkParams("id", "Invalid user id.")
    .notEmpty()
    .isInt();
  params.body = { where: { id: req.params.id } };
  return db.retrieve(req, res, params);
};

update = (req, res) => {
  console.log("in update user");
  req
    .checkBody(
      "first_name",
      "First Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  req
    .checkBody(
      "last_name",
      "Last Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  req
    .checkBody("gender", "Invalid user Gender.")
    .optional()
    .isIn(["M", "F"]);
  req
    .checkParams("id", "Invalid user id.")
    .notEmpty()
    .isInt();
  params.condition = {
    where: {
      id: req.params.id
    } /* ,
    attributes: ['id', 'first_name','last_name','gender','birth_date'] */
  };
  params.body = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    birth_date: req.body.birth_date
  };
  /* if (req.user.isAdmin()) {
      params.body.role = req.body.role;
      req
        .checkBody("role", "Invalid user role.")
        .isIn(["user", "admin", "support"]);
    } */
  return db.update(req, res, params);
};

destroy = (req, res) => {
  req
    .checkParams("id", "Invalid user id.")
    .notEmpty()
    .isInt();
  params.condition = { where: { id: req.params.id } };
  return db.destroy(req, res, params);
};

module.exports = {
  retrieve: retrieve,
  update: update,
  destroy: destroy
};
