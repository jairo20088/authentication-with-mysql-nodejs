const User = require("../modal/user");

exports.getAuth = (req, res, next) => {
  res.render("login");
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};
