// 📁 routes/auth.js
const express = require("express");
const router = express.Router();

const USERS = [{ username: "admin", password: "123456" }];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
  }
});

module.exports = router;
