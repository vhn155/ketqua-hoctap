// routes/auth.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "..", "users.json");

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Sai username hoặc mật khẩu" });
  res.json({ message: "Đăng nhập thành công", username: user.username });
});

module.exports = router;
