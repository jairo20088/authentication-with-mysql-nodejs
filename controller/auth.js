const User = require("../modal/user");

exports.getAuth = (req, res, next) => {
  res.render("login");
};
