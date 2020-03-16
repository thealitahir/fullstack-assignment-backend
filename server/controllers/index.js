var fs = require("fs");
getUrl = (url) => {
  return "/api" + url;
}
var routes = {
  requireAuthentication: require("../helpers/authhelper").isAuthenticated,
  getUrl: getUrl
};
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach((file) =>{
    var name = file.replace(".js", "");
    routes[name] = require(__dirname + "/" + name);
  });
module.exports = routes;
