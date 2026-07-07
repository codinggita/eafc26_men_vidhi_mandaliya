const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const { authLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema, "body"), authController.register);
router.post("/login", authLimiter, validate(loginSchema, "body"), authController.login);

module.exports = router;
