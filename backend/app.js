const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const playerRoutes = require("./src/routes/playerRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EAFC 26 Player Analytics API is running"
  });
});

// Mount routes
app.use("/players", playerRoutes);

// Global Error Handler Middleware
app.use(errorMiddleware);

module.exports = app;
