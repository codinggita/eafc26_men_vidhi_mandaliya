const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().required().min(2).max(50),
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().required().min(6).max(100),
  role: Joi.string().valid("user", "admin").default("user"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
