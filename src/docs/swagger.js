const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "PrimeTrade Intelligence API",
    version: "1.0.0",
    description:
      "REST API for PrimeTrade crypto trade signals with JWT authentication and role-based access control.",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new PrimeTrade user",
        responses: {
          201: { description: "User registered" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login PrimeTrade user",
        responses: {
          200: { description: "Login successful" },
        },
      },
    },
    "/signals": {
      get: {
        tags: ["Trade Signals"],
        summary:
          "List trade signals for current user (admin can see all, with filters & pagination)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "List of trade signals" },
        },
      },
      post: {
        tags: ["Trade Signals"],
        summary: "Create a new trade signal",
        security: [{ bearerAuth: [] }],
        responses: {
          201: { description: "Created trade signal" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
