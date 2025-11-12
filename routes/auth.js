
const express = require("express");
const fs = require("fs");
const router = express.Router();

const USERS_FILE = "./users.json";
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
  res.json({ username: user.username });
});

module.exports = router;
