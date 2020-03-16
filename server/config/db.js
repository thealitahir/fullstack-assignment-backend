const models = require("../models");
const responseHelper = require("../helpers/responseHelper");

var _limit = 5; // number of records per page
var offset = 0;

pagination = (data, req) => {
  var page = parseInt(req.query.page) || 1;
  var count = data.count || data.length || 0;
  var pages = Math.ceil(count / _limit);
  var is_last = pages == page;
  var is_first = 1 == page;
  var result = {};
  result.total = count;
  result.pages = pages;
  result.per_page = _limit;
  result.current = page;
  result.next = is_last ? null : page + 1;
  result.prev = is_first ? null : page - 1;
  result.is_first = is_first;
  result.is_last = is_last;
  return result;
};

list = (req, res, params, cb) => {
  console.log("db list");
  if ((errors = req.validationErrors()))
    responseHelper.sendError({ name: "ValidationErrors", errors: errors }, res);
  else {
    var _pagination = false;
    if (
      typeof params["pagination"] != "undefined" &&
      params["pagination"] == "false"
    ) {
      var _pagination = false;
    } else {
      _pagination = true;
      var page = parseInt(req.query.page) || 1; // page number
      offset = _limit * (page - 1);
      params.body.limit = _limit;
      params.body.offset = offset;
      params.body.order = [["created_at", "ASC"]];
    }
    console.log(JSON.stringify(params, null, 2));
    models[params.tableName]
      .findAndCountAll(params.body)
      .then(data => {
        if (typeof cb == "function") {
          cb(data);
        } else if (_pagination)
          res.status(200).send({
            success: true,
            data: data.rows,
            pagination: pagination(data, req)
          });
        else res.status(200).send({ success: true, data: data.rows });
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
        responseHelper.sendError(error, res);
      });
  }
};

create = (req, res, params, cb) => {
  if ((errors = req.validationErrors()))
    responseHelper.sendError({ name: "ValidationErrors", errors: errors }, res);
  else {
    var includes = params.include || {};
    return models[params.tableName]
      .create(params.body, includes)
      .then(data => {
        if (typeof cb == "function") cb(data);
        else {
          res.status(201).send({
            success: true,
            data: data,
            message: "Successfully created."
          });
        }
      })
      .catch(err => {
        responseHelper.sendError(err, res);
      });
  }
};

retrieve = (req, res, params, callback) => {
  console.log(params);
  console.log(typeof callback);
  if ((errors = req.validationErrors())) {
    var response = { errors: [] };
    errors.forEach(err => {
      response.errors.push({ message: err.msg });
    });
    res
      .status(422)
      .send({ status: 422, success: false, errors: response.errors });
  } else {
    console.log("checking log in details");
    return models[params.tableName]
      .findOne(params.body)
      .then(data => {
        console.log(typeof callback);
        if (typeof callback == "function") callback(data);
        else res.status(200).send({ success: true, data: data });
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
        responseHelper.sendError(error, res);
      });
  }
};

update = (req, res, params, cb) => {
  if ((errors = req.validationErrors())) {
    var response = { errors: [] };
    errors.forEach(err => {
      response.errors.push({ message: err.msg });
    });
    res
      .status(422)
      .send({ status: 422, success: false, errors: response.errors });
  } else {
    if (typeof cb == "function") {
      console.log("CB is function.");
      return models[params.tableName]
        .findOne(params.condition)
        .then(data => {
          if (!data) {
            return responseHelper.notFound(res);
          } else {
            data
              .updateAttributes(params.body)
              .then(cb)
              .catch(error => {
                console.log(JSON.stringify(error, null, 2));
                responseHelper.sendError(error, res);
              });
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error, null, 2));
          responseHelper.sendError(error, res);
        });
    } else {
      console.log("CB is not a function.");
      console.log(params.condition);
      console.log(params.body);
      return models[params.tableName]
        .update(params.body, params.condition)
        .then(data => {
          if (!data) {
            return responseHelper.notFound(result);
          }
          return res.status(200).send({
            success: true,
            data: data,
            message: "Successfully Updated."
          });
        })
        .catch(error => {
          console.log("update atrributes error");
          console.log(JSON.stringify(error, null, 2));
          responseHelper.sendError(error, res);
        });
    }
  }
};

destroy = (req, res, params) => {
  if ((errors = req.validationErrors())) {
    var response = { errors: [] };
    errors.forEach(err => {
      response.errors.push({ message: err.msg });
    });
    res
      .status(422)
      .send({ status: 422, success: false, errors: response.errors });
  } else {
    return models[params.tableName]
      .destroy(params.condition)
      .then(data => {
        return res
          .status(200)
          .send({ success: true, message: "Successfully Deleted." });
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
        return responseHelper.sendError(error, res);
      });
  }
};

bulkCreate = (req, res, params, cb) => {
  console.log("in db bulk create");
  console.log(params);
  if ((errors = req.validationErrors())) {
    var response = { errors: [] };
    errors.forEach(err => {
      response.errors.push({ message: err.msg });
    });
    res
      .status(422)
      .send({ status: 422, success: false, errors: response.errors });
  } else {
    console.log(JSON.stringify(params, null, 2));
    const message = params.message || "Successfully created.";
    return models[params.tableName]
      .bulkCreate(params.body)
      .then(data => {
        if (typeof cb == "function") cb(data);
        else
          res.status(201).send({ success: true, data: data, message: message });
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
        responseHelper.sendError(error, res);
      });
  }
};

module.exports = {
  list: list,
  create: create,
  retrieve: retrieve,
  update: update,
  destroy: destroy,
  bulkCreate: bulkCreate,
  sendError: responseHelper.sendError,
  notFound: responseHelper.notFound,
  models: models
};
