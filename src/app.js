// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const signalRoutes = require("./routes/signalRoutes");

const errorHandler = require("./middleware/errorHandler"); // <-- correct import
const requestLogger = require("./middleware/logger");      // <-- correct import

const app = express();

// ------------------------
// Middlewares
// ------------------------
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);  // <-- this must be a FUNCTION, not requestLogger()

// ------------------------
// Swagger
// ------------------------
const swaggerFile = path.join(__dirname, "../docs/swagger.json");

if (fs.existsSync(swaggerFile)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, "utf8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// ------------------------
// Health check
// ------------------------
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "PrimeTrade Intelligence API",
    timestamp: new Date().toISOString(),
  });
});

// ------------------------
// Routes
// ------------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/signals", signalRoutes);

// ------------------------
// 404 handler
// ------------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ------------------------
// Global error handler
// ------------------------
app.use(errorHandler);  // <-- must be errorHandler (NOT errorHandler())

module.exports = app;
