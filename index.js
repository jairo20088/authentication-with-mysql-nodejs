const express = require("express");
const session = require("express-session");
const path = require("path");
const mySQLStore = require("express-mysql-session")(session);
const authRoute = require("./routes/auth");
const homepageRoute = require("./routes/index");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "view");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

const options = {
  host: "localhost",
  user: "root",
  password: "jairo20089",
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

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;

  next();
});

app.use(authRoute);
app.use(homepageRoute);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
