// src/controllers/signalController.js
const {
  createTradeSignal,
  listTradeSignals,
  getTradeSignalById,
  updateTradeSignal,
  deleteTradeSignal,
  getSignalsStats, // make sure this exists in your model; if not, remove this + statsHandler
} = require("../models/signalModel");

async function createSignalHandler(req, res, next) {
  try {
    const data = {
      ...req.body,
      created_by: req.user.id,
    };
    const signal = await createTradeSignal(data);
    res.status(201).json({ message: "Trade signal created", signal });
  } catch (err) {
    next(err);
  }
}

async function listSignalsHandler(req, res, next) {
  try {
    const { page = 1, limit = 10, symbol, risk_level, status, sort } =
      req.query;

    const signals = await listTradeSignals({
      user: req.user,
      page: Number(page),
      limit: Number(limit),
      symbol,
      risk_level,
      status,
      sort,
    });

    res.json({
      page: Number(page),
      limit: Number(limit),
      results: signals.length,
      signals,
    });
  } catch (err) {
    next(err);
  }
}

async function updateSignalHandler(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await getTradeSignalById(id);

    if (!existing) {
      return res.status(404).json({ message: "Trade signal not found" });
    }

    if (req.user.role !== "admin" && existing.created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to modify this trade signal" });
    }

    const updated = await updateTradeSignal(id, req.body);
    res.json({ message: "Trade signal updated", signal: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteSignalHandler(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await getTradeSignalById(id);

    if (!existing) {
      return res.status(404).json({ message: "Trade signal not found" });
    }

    if (req.user.role !== "admin" && existing.created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete this trade signal" });
    }

    await deleteTradeSignal(id);
    res.json({ message: "Trade signal deleted" });
  } catch (err) {
    next(err);
  }
}

async function statsHandler(req, res, next) {
  try {
    const stats = await getSignalsStats(req.user);
    res.json({ stats });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  createSignalHandler,
  listSignalsHandler,
  updateSignalHandler,
  deleteSignalHandler,
  statsHandler, // if you don’t want stats, remove this + the route
};
