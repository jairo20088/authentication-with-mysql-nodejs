const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Blog = sequelize.define("blog", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT("longtext"),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  }
});
module.exports = Blog;
