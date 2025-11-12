// 📁 routes/hocSinh.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "../data/hocSinh.json");

const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const writeData = (data) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// Lấy toàn bộ danh sách học sinh
router.get("/", (req, res) => {
  res.json(readData());
});

// Thêm học sinh
router.post("/", (req, res) => {
  const data = readData();
  const newHS = { id: Date.now(), ...req.body };
  data.push(newHS);
  writeData(data);
  res.json(newHS);
});

// Cập nhật học sinh
router.put("/:id", (req, res) => {
  const data = readData();
  const idx = data.findIndex((hs) => hs.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Không tìm thấy học sinh" });
  data[idx] = { ...data[idx], ...req.body };
  writeData(data);
  res.json(data[idx]);
});

// Xóa học sinh
router.delete("/:id", (req, res) => {
  let data = readData();
  data = data.filter((hs) => hs.id !== parseInt(req.params.id));
  writeData(data);
  res.json({ message: "Đã xóa" });
});

module.exports = router;
