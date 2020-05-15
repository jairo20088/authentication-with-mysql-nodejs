const express = require("express");
const path = require("path");
const app = express();

const authRoute = require("./routes/auth");
const homepageRoute = require("./routes/index");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "view");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoute);
app.use(homepageRoute);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
