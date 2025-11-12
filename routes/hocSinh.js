// routes/hocSinh.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataPath = path.join(__dirname, "..", "data.json");

// helper read/write
const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// GET all students (with optional search)
router.get("/", (req, res) => {
  const { search } = req.query;
  let hocSinh = readData();
  if (search) {
    hocSinh = hocSinh.filter(h => h.ten.toLowerCase().includes(search.toLowerCase()));
  }
  res.json(hocSinh);
});

// POST new student
router.post("/", (req, res) => {
  const { ten, diemA, diemB, diemC } = req.body;
  const hocSinh = readData();
  const newHS = { id: uuidv4(), ten, diemA, diemB, diemC };
  hocSinh.push(newHS);
  writeData(hocSinh);
  res.json(newHS);
});

// PUT update student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ten, diemA, diemB, diemC } = req.body;
  const hocSinh = readData();
  const index = hocSinh.findIndex(h => h.id === id);
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy học sinh" });
  hocSinh[index] = { id, ten, diemA, diemB, diemC };
  writeData(hocSinh);
  res.json(hocSinh[index]);
});

// DELETE student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let hocSinh = readData();
  hocSinh = hocSinh.filter(h => h.id !== id);
  writeData(hocSinh);
  res.json({ message: "Xóa thành công" });
});

module.exports = router;
