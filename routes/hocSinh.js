const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const DATA_FILE = "./data.json";

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  const data = readData();
  const { search } = req.query;
  const result = search ? data.filter(h => h.ten.toLowerCase().includes(search.toLowerCase())) : data;
  res.json(result);
});

router.post("/", (req, res) => {
  const data = readData();
  const newHS = { id: uuidv4(), ...req.body };
  data.push(newHS);
  writeData(data);
  res.json(newHS);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex(h => h.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  data[index] = { id: req.params.id, ...req.body };
  writeData(data);
  res.json(data[index]);
});

router.delete("/:id", (req, res) => {
  let data = readData();
  data = data.filter(h => h.id !== req.params.id);
  writeData(data);
  res.json({ success: true });
});

module.exports = router;
