const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./data.json";

// Lấy tất cả hoặc search
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "[]");
  const { search } = req.query;
  if (search) {
    const filtered = data.filter(h => h.ten.toLowerCase().includes(search.toLowerCase()));
    return res.json(filtered);
  }
  res.json(data);
});

// Thêm học sinh
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "[]");
  const newHS = { id: uuidv4(), ...req.body };
  data.push(newHS);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(newHS);
});

// Sửa học sinh
router.put("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "[]");
  const index = data.findIndex(h => h.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  data[index] = { ...data[index], ...req.body };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(data[index]);
});

// Xóa học sinh
router.delete("/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "[]");
  data = data.filter(h => h.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Deleted" });
});

module.exports = router;
