
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersPath = path.join(__dirname, "..", "users.json");

// Đăng nhập
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ success: true, username: user.username });
  } else {
    return res.status(401).json({ success: false, message: "Sai username hoặc password" });
  }
});

module.exports = router;
