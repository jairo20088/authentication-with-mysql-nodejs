const express = require("express");
const app = express();
const authRoute = require("./routes/auth");

app.use(authRoute);

app.listen(3000);
