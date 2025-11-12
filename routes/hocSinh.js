
const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const DATA_FILE = "data.json";
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET all or search
router.get("/", (req, res) => {
  let data = readData();
  const { search } = req.query;
  if (search) data = data.filter(h => h.ten.toLowerCase().includes(search.toLowerCase()));
  res.json(data);
});

// POST add
router.post("/", (req, res) => {
  const { ten, diemA, diemB, diemC } = req.body;
  if (!ten || diemA == null || diemB == null || diemC == null) return res.status(400).json({ message: "Thiếu dữ liệu" });
  const data = readData();
  const newHS = { id: uuidv4(), ten, diemA, diemB, diemC };
  data.push(newHS);
  writeData(data);
  res.json(newHS);
});

// PUT update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ten, diemA, diemB, diemC } = req.body;
  const data = readData();
  const idx = data.findIndex(h => h.id === id);
  if (idx === -1) return res.status(404).json({ message: "Không tìm thấy học sinh" });
  data[idx] = { id, ten, diemA, diemB, diemC };
  writeData(data);
  res.json(data[idx]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let data = readData();
  data = data.filter(h => h.id !== id);
  writeData(data);
  res.json({ message: "Đã xóa" });
});

module.exports = router;
