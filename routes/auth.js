// 📁 routes/auth.js
const express = require("express");
const router = express.Router();

const DUMMY_USER = { username: "admin", password: "123456" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    return res.json({ token: "fake-jwt-token" });
  } else {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
});

router.post("/verify", (req, res) => {
  const { token } = req.body;
  if (token === "fake-jwt-token") {
    return res.json({ valid: true });
  } else {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
