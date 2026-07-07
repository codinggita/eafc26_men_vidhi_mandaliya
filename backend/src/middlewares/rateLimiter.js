const { rateLimit } = require("express-rate-limit");
const securityConfig = require("../config/security");

const apiLimiter = rateLimit({
  windowMs: securityConfig.rateLimiter.apiWindowMs,
  max: securityConfig.rateLimiter.apiMax,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: securityConfig.rateLimiter.authWindowMs,
  max: securityConfig.rateLimiter.authMax,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
};
