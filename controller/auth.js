const User = require("../modal/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.getAuth = (req, res, next) => {
  res.render("login", {
    errorMessage: "",
    oldLogin: {
      email: "",
      password: ""
    }
  });
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postLogin = (req, res, next) => {
  let myUSer;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.render("login", {
          errorMessage: "error",
          oldLogin: {
            email: req.body.email,
            password: req.body.password
          }
        });
      }
      myUSer = user;
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (result) {
          req.session.isAuthenticated = true;
          req.session.user = myUSer;
          res.redirect("/");
        } else {
          res.render("login", {
            errorMessage: "error",
            oldLogin: {
              email: req.body.email,
              password: req.body.password
            }
          });
        }
      });
    })

    .catch(err => {
      console.log("error");
    });
};

exports.postSignup = (req, res, next) => {
  if (req.body.password === req.body.confirm) {
    bcrypt
      .hash(req.body.password, 10)
      .then(password => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: password
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/signin");
};
