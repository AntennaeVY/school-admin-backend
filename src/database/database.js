const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  logging: console.log,
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
