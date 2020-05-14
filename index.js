const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const sequelize = require("./util/database");

app.use(authRoute);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
