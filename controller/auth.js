const User = require("../modal/user");

exports.getAuth = (req, res, next) => {
  res.send("Hello Jose !!");
  User.create({
    name: "Jose Mieses",
    email: "test@gmail.com",
    password: "123123123"
  });
};
