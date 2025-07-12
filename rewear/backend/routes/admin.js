const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/all-users", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });
  const users = await User.find();
  res.json(users);
});

module.exports = router;
