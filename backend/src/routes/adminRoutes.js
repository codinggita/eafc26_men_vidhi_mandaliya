const express = require("express");
const adminController = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { PERMISSIONS } = require("../utils/permissions");
const router = express.Router();

router.use(protect);

router.get("/dashboard", authorize(PERMISSIONS.ACCESS_DASHBOARD), adminController.getDashboardStats);

module.exports = router;
