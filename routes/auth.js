const express = require("express");
const router = express.Router();
const fs = require("fs");

const USERS_FILE = "./users.json";

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8") || "[]");
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ username: user.username });
});

module.exports = router;
