const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const dataPath = path.join(__dirname, "..", "data.json");

// Lấy danh sách học sinh (có thể tìm kiếm theo tên)
router.get("/", (req, res) => {
  const { search } = req.query;
  let hocSinh = JSON.parse(fs.readFileSync(dataPath));
  if (search) {
    hocSinh = hocSinh.filter(h => h.ten.toLowerCase().includes(search.toLowerCase()));
  }
  res.json(hocSinh);
});

// Thêm học sinh
router.post("/", (req, res) => {
  const hocSinh = JSON.parse(fs.readFileSync(dataPath));
  const { ten, diemA, diemB, diemC } = req.body;
  const newHS = { id: uuidv4(), ten, diemA, diemB, diemC };
  hocSinh.push(newHS);
  fs.writeFileSync(dataPath, JSON.stringify(hocSinh, null, 2));
  res.json(newHS);
});

// Sửa học sinh
router.put("/:id", (req, res) => {
  const hocSinh = JSON.parse(fs.readFileSync(dataPath));
  const { id } = req.params;
  const { ten, diemA, diemB, diemC } = req.body;
  const index = hocSinh.findIndex(h => h.id === id);
  if (index !== -1) {
    hocSinh[index] = { id, ten, diemA, diemB, diemC };
    fs.writeFileSync(dataPath, JSON.stringify(hocSinh, null, 2));
    return res.json(hocSinh[index]);
  } else {
    return res.status(404).json({ message: "Học sinh không tồn tại" });
  }
});

// Xóa học sinh
router.delete("/:id", (req, res) => {
  let hocSinh = JSON.parse(fs.readFileSync(dataPath));
  const { id } = req.params;
  hocSinh = hocSinh.filter(h => h.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(hocSinh, null, 2));
  res.json({ success: true });
});

module.exports = router;
