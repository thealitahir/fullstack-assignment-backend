module.exports = (app, controller) => {
  app.post(controller.getUrl("/login"), controller.auth.login);
  app.post(controller.getUrl("/signup"), controller.auth.signup);
//   app.post(controller.getUrl("/passwords/reset"), controller.auth.reset);
//   app.post(controller.getUrl("/passwords/reset/:token"), controller.auth.verifyResetToken);
};
