// src/routes/signalRoutes.js
const express = require("express");
const { body } = require("express-validator");
const {
  createSignalHandler,
  listSignalsHandler,
  updateSignalHandler,
  deleteSignalHandler,
  statsHandler, // make sure this is exported in controller; if not using stats, remove this line + route below
} = require("../controllers/signalController");
const { authRequired } = require("../middleware/auth");
const validateRequest = require("../middleware/validate");

const router = express.Router();

// all /signals routes are protected
router.use(authRequired);

// GET /api/v1/signals
router.get("/", listSignalsHandler);

// OPTIONAL: GET /api/v1/signals/stats
// (remove this route if you don't want stats)
router.get("/stats", statsHandler);

// POST /api/v1/signals
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("symbol").notEmpty().withMessage("Symbol is required"),
    body("entry_price").isNumeric().withMessage("Entry price must be numeric"),
    body("target_price")
      .isNumeric()
      .withMessage("Target price must be numeric"),
    body("stop_loss").isNumeric().withMessage("Stop loss must be numeric"),
    body("risk_level")
      .isIn(["LOW", "MEDIUM", "HIGH"])
      .withMessage("Risk level must be LOW, MEDIUM, or HIGH"),
    body("status")
      .optional()
      .isIn(["OPEN", "CLOSED", "CANCELLED"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  createSignalHandler
);

// PUT /api/v1/signals/:id
router.put(
  "/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("symbol").notEmpty().withMessage("Symbol is required"),
    body("entry_price").isNumeric().withMessage("Entry price must be numeric"),
    body("target_price")
      .isNumeric()
      .withMessage("Target price must be numeric"),
    body("stop_loss").isNumeric().withMessage("Stop loss must be numeric"),
    body("risk_level")
      .isIn(["LOW", "MEDIUM", "HIGH"])
      .withMessage("Risk level must be LOW, MEDIUM, or HIGH"),
    body("status")
      .isIn(["OPEN", "CLOSED", "CANCELLED"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  updateSignalHandler
);

// DELETE /api/v1/signals/:id
router.delete("/:id", deleteSignalHandler);

module.exports = router;
