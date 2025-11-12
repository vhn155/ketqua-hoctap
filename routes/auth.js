const express = require("express");
const fs = require("fs");
const router = express.Router();

const USERS_FILE = "users.json";
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

// POST login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Thiếu username hoặc password" });
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  res.json({ username: user.username, name: user.name });
});

module.exports = router;
