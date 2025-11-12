
// 📁 routes/hocSinh.js
const express = require("express");
const router = express.Router();

let danhSachHocSinh = [
  { id: 1, ten: "Nguyễn Văn A", lop: "12A1", diemTB: 8.5 },
  { id: 2, ten: "Trần Thị B", lop: "12A2", diemTB: 7.9 },
];

// Lấy toàn bộ danh sách
router.get("/", (req, res) => {
  res.json(danhSachHocSinh);
});

// Thêm học sinh
router.post("/", (req, res) => {
  const newHS = { id: Date.now(), ...req.body };
  danhSachHocSinh.push(newHS);
  res.json(newHS);
});

// Cập nhật
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = danhSachHocSinh.findIndex((hs) => hs.id == id);
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy" });
  danhSachHocSinh[index] = { ...danhSachHocSinh[index], ...req.body };
  res.json(danhSachHocSinh[index]);
});

// Xóa
router.delete("/:id", (req, res) => {
  danhSachHocSinh = danhSachHocSinh.filter((hs) => hs.id != req.params.id);
  res.json({ message: "Đã xóa thành công" });
});

module.exports = router;
