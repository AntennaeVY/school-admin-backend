const { Sequelize } = require("sequelize");
const { Client } = require("pg");

const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;
const dbHost = process.env.PGHOST;
const dbPort = process.env.PGPORT;
const dbName = process.env.PGDATABASE;

const dbURI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(dbURI, {
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected successfuly");
    await sequelize.sync({ alter: true }); // Might be destructive, don't use in production...
  } catch (error) {
    console.log("DB Error: ", error.message);
  }
})();

module.exports = sequelize;
