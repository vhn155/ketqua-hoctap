// 📁 routes/auth.js
const express = require("express");
const fs = require("fs");
const router = express.Router();

// Đọc danh sách người dùng từ file users.json
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!fs.existsSync("users.json")) {
    return res.status(500).json({ success: false, message: "File users.json không tồn tại!" });
  }

  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
  }
});

module.exports = router;
