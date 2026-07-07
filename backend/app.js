const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const playerRoutes = require("./src/routes/playerRoutes");
const authRoutes = require("./src/routes/authRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const statsRoutes = require("./src/routes/statsRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const playerController = require("./src/controllers/playerController");
const requestTimer = require("./src/middlewares/requestTimer");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const corsConfig = require("./src/config/cors");
const { apiLimiter } = require("./src/middlewares/rateLimiter");
const { mongoSanitizer, xssSanitizer } = require("./src/middlewares/sanitizeMiddleware");

const app = express();

// Secure Headers
app.use(helmet());

// Enable CORS with custom configuration
app.use(cors(corsConfig));

app.use(express.json());

// Performance monitoring & logging middlewares
app.use(requestTimer);
app.use(loggerMiddleware);

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitizer);

// Data Sanitization against XSS
app.use(xssSanitizer);

// API Rate Limiting
app.use(apiLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EAFC 26 Player Analytics API is running",
  });
});

// Authentication routes
app.use("/auth", authRoutes);

// Admin dashboard routes
app.use("/admin", adminRoutes);

// Analytics and stats routes
app.use("/analytics", analyticsRoutes);
app.use("/stats", statsRoutes);

// Explicit search route
app.get("/search/players", playerController.getAllPlayers);

// Mount main player routes
app.use("/players", playerRoutes);

// Global Error Handler Middleware
app.use(errorMiddleware);

module.exports = app;
