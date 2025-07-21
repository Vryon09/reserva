import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { adminAuth } from "../middleware/adminAuth.js";
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const ADMIN_USER = process.env.ADMIN_USER;
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET;

  const { user, password } = req.body;

  if (user !== ADMIN_USER) {
    return res.status(401).json({ message: "Invalid User" });
  }

  const isMatch = bcrypt.compare(password, ADMIN_PASSWORD);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

  res.json({ token });
});

// router.get("/dashboard", adminAuth, (req, res) => {
//   res.json({ message: "Welcome to Admin Dashboard", admin: req.admin });
// });

export default router;
