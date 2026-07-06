const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const router = express.Router();

router.post("/register", validate(registerSchema, "body"), authController.register);
router.post("/login", validate(loginSchema, "body"), authController.login);

module.exports = router;
