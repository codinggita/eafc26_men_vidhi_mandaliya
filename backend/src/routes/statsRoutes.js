const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/players/count", statsController.getPlayerCount);
router.get("/players/average-rating", statsController.getAverageRating);

module.exports = router;
