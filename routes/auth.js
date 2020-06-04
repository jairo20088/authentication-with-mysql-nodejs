const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const authController = require("../controller/auth");
const User = require("../modal/user");

router.get("/signin", authController.getAuth);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    body("email").custom(value => {
      return User.findOne({ where: { email: value } }).then(user => {
        console.log(user);
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    })
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid Email")
      .trim(),
    check("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Password most be at least 5 characters")
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

module.exports = router;
