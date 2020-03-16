var params = { tableName: "User", body: {} };

login = (req, res) => {
  console.log("in login");
  req
    .checkBody("email", "Enter a valid email address.")
    .isEmail()
    .isLength({ min: 3, max: 100 });
  req
    .checkBody("password", "Password should be at least 6 chars long.")
    .isLength({ min: 6 });
  const email = req.body.email;
  const password = req.body.password;
  params.body = { where: { email: email } };
  req.db.retrieve(req, res, params, user => {
    console.log("back from db");
    if (!user) {
      return req.db.sendError(
        {
          code: 404,
          message: "Authentication failed. User not exist or not confirmed."
        },
        res
      );
    } else {
      if (user.authenticate(password)) {
        return res.status(200).send({
          success: true,
          data: user,
          token: user.generateJwtToken(),
          message: "Successfully login."
        });
      }
      return req.db.sendError(
        { code: 401, message: "Authentication failed. Wrong Password." },
        res
      );
    }
  });
};

signup = (req, res) => {
  console.log("in signup", req.body);
  req
    .checkBody("email", "Enter a valid email address.")
    .isEmail()
    .isLength({ min: 3, max: 100 });
  req
    .checkBody(
      "first_name",
      "First Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  req
    .checkBody(
      "first_name",
      "Last Name must be between 2 and 50 characters in length."
    )
    .isLength({ min: 2, max: 50 });
  req
    .checkBody("password", "Password should be at least 6 chars long.")
    .isLength({ min: 6 });
  params.body = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    // password: bcrypt.hashSync(req.body.password, salt, null),
    email: req.body.email
  };

  return req.db.create(req, res, params);
};
module.exports = {
  login: login,
  signup: signup
};
