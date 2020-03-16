const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var expressValidator = require("express-validator");

const authHelper = require("./server/helpers/authhelper");
const controllers = require("./server/controllers");
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(expressValidator());
app.use(authHelper.verifyJwtToken);

// Require our routes into the application.
require("./server/routes")(app, controllers);
module.exports = app;
