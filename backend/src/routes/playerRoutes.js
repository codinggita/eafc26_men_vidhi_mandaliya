const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validationMiddleware");
const {
  playerBodySchema,
  playerUpdateSchema,
  playerQuerySchema,
} = require("../validators/playerValidator");

router
  .route("/")
  .get(validate(playerQuerySchema, "query"), playerController.getAllPlayers)
  .post(
    protect,
    restrictTo("admin"),
    validate(playerBodySchema, "body"),
    playerController.createPlayer
  );

// Preset analytics filters (e.g. /players/filter/high-rated)
router.get("/filter/:filterType", playerController.getPredefinedFilteredPlayers);

router
  .route("/:id")
  .get(playerController.getPlayerById)
  .patch(
    protect,
    restrictTo("admin"),
    validate(playerUpdateSchema, "body"),
    playerController.updatePlayer
  )
  .delete(protect, restrictTo("admin"), playerController.deletePlayer);

module.exports = router;
