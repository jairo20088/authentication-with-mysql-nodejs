const express = require("express");
const session = require("express-session");
const path = require("path");
const mySQLStore = require("express-mysql-session")(session);
const authRoute = require("./routes/auth");
const homepageRoute = require("./routes/index");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const csrf = require("csurf");
const app = express();

const User = require("./modal/user");
const Blog = require("./modal/blog");

app.set("view engine", "ejs");
app.set("views", "view");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

const options = {
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "authentication"
};
const store = new mySQLStore(options);
app.use(
  session({
    secret: "its a secret",
    resave: false,
    saveUninitialized: true,
    store: store
  })
);
const csrfCall = csrf();

app.use(csrfCall);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    User.findByPk(req.session.user.id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  }
});

app.use(authRoute);
app.use(homepageRoute);

Blog.belongsTo(User, { consraints: true });
User.hasMany(Blog);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
