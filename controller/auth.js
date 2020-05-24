const User = require("../modal/user");
const bcrypt = require("bcrypt");

exports.getAuth = (req, res, next) => {
  res.render("login");
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      req.session.isAuthenticated = true;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(result => {
      if (result === null) {
        if (req.body.password === req.body.confirm) {
          bcrypt
            .hash(req.body.password, 10)
            .then(password => {
              User.create({
                name: req.body.name,
                email: req.body.email,
                password: password
              });
              res.redirect("/signin");
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        console.log(result);
      }
    })
    .catch(err => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/signin");
};
