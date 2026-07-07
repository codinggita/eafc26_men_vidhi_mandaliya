const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const CustomError = require("../utils/customError");

class AuthService {
  async register(name, email, password, role = "user") {
    if (!name || !email || !password) {
      throw new CustomError("Please fill out all registration details", 400);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      throw new CustomError("Email address is already registered", 400);
    }

    const user = await User.create({ name, email, password, role });

    // Sanitize response
    user.password = undefined;

    const token = generateToken(user._id);
    return { user, token };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new CustomError("Please provide both email and password", 400);
    }

    // Since select: false is specified on model, select password explicitly
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError("Incorrect email or password", 401);
    }

    user.password = undefined;
    const token = generateToken(user._id);
    return { user, token };
  }
}

module.exports = new AuthService();
