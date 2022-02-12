const express = require("express");
const app = express();

// Modules
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumment = require("../openapi.json");

// Custom modules
const routes = require("./routes/routes");

// Environment Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: `${__dirname}/.env` });
}

app.set("PORT", process.env.PORT || 3000);

// Database
require("./database/database");

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumment));

// Server
app.listen(app.get("PORT"), () => {
  console.log(`App listening on PORT ${app.get("PORT")}`);
});

module.exports = app;
