const Sequelize = require("sequelize");

const sequelize = new Sequelize("authentication", "root", "jairo20089", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
