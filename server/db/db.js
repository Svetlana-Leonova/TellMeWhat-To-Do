const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName = pkg.name;

let db;

if (process.env.DEPLOY === "true") {
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
    logging: false,
  });
}
module.exports = db;
