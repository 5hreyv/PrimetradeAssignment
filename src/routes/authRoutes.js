const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { register, login, listUsers } = require("../controllers/authController");
const validateRequest = require("../middleware/validate");
const { requireRole, authRequired } = require("../middleware/auth");
const { createUser } = require("../models/userModel");

const router = express.Router();

// POST /api/v1/auth/register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  register
);

// POST /api/v1/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

// GET /api/v1/auth/users (admin only)
router.get("/users", authRequired, requireRole("admin"), listUsers);

// POST /api/v1/auth/create-admin (admin creates another admin)
router.post(
  "/create-admin",
  authRequired,
  requireRole("admin"),
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const admin = await createUser({
        name,
        email,
        password_hash,
        role: "admin",
      });

      res.status(201).json({
        message: "Admin created successfully",
        admin,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
