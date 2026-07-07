const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { PERMISSIONS } = require("../utils/permissions");

router.use(protect);
router.use(authorize(PERMISSIONS.READ_ANALYTICS));

router.get("/players/top-rated", analyticsController.getTopRated);
router.get("/players/top-scorers", analyticsController.getTopScorers);
router.get("/players/top-passers", analyticsController.getTopPassers);
router.get("/players/top-dribblers", analyticsController.getTopDribblers);
router.get("/players/top-defenders", analyticsController.getTopDefenders);
router.get("/players/top-teams", analyticsController.getTopTeams);
router.get("/players/top-leagues", analyticsController.getTopLeagues);
router.get("/players/top-nations", analyticsController.getTopNations);
router.get("/players/position-distribution", analyticsController.getPositionDistribution);

module.exports = router;
