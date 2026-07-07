const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { PERMISSIONS } = require("../utils/permissions");
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
    authorize(PERMISSIONS.WRITE_PLAYERS),
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
    authorize(PERMISSIONS.WRITE_PLAYERS),
    validate(playerUpdateSchema, "body"),
    playerController.updatePlayer
  )
  .delete(protect, authorize(PERMISSIONS.WRITE_PLAYERS), playerController.deletePlayer);

module.exports = router;
