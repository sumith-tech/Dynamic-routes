const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Sumith$2200", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
