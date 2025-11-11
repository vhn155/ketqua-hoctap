
// 📁 routes/hocSinh.js
const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "data.json";

// Helper đọc/ghi file
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// ✅ Lấy danh sách học sinh (và tìm kiếm)
router.get("/", (req, res) => {
  const { search } = req.query;
  let data = readData();
  if (search) {
    const keyword = search.toLowerCase();
    data = data.filter(h => h.ten.toLowerCase().includes(keyword));
  }
  res.json(data);
});

// ✅ Thêm học sinh mới
router.post("/", (req, res) => {
  const data = readData();
  const newHS = { id: Date.now(), ...req.body };
  data.push(newHS);
  saveData(data);
  res.json(newHS);
});

// ✅ Sửa học sinh
router.put("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const index = data.findIndex(h => h.id === id);
  if (index === -1) return res.status(404).json({ error: "Không tìm thấy học sinh" });

  data[index] = { ...data[index], ...req.body };
  saveData(data);
  res.json(data[index]);
});

// ✅ Xóa học sinh
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const newData = data.filter(h => h.id !== id);
  saveData(newData);
  res.json({ success: true });
});

module.exports = router;
