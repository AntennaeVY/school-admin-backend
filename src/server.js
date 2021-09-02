const express = require("express");
const app = express();

const routes = require("./routes/routes");

// Environment Variables
if (process.env.NODE_ENV == "dev") {
  require("dotenv").config({ path: `${__dirname}/.env` });
}

app.set("PORT", process.env.PORT || 3000);

// Database
require("./database/database");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Server
app.listen(app.get("PORT"), () => {
  console.log(`App listening on PORT ${app.get("PORT")}`);
});
