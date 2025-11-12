const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

// ===== USERS AUTH =====
const usersFile = path.join(__dirname, "users.json");
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, username: user.username });
  } else {
    res.status(401).json({ success: false, message: "Sai username hoặc password" });
  }
});

// ===== HOC SINH CRUD =====
const hocSinhFile = path.join(__dirname, "data.json");

// GET all + search
app.get("/api/hocSinh", (req, res) => {
  const data = JSON.parse(fs.readFileSync(hocSinhFile, "utf-8"));
  const { search } = req.query;
  if (search) {
    const filtered = data.filter(h => h.ten.toLowerCase().includes(search.toLowerCase()));
    res.json(filtered);
  } else {
    res.json(data);
  }
});

// POST add
app.post("/api/hocSinh", (req, res) => {
  const { ten, diemA, diemB, diemC } = req.body;
  const data = JSON.parse(fs.readFileSync(hocSinhFile, "utf-8"));
  const newHS = { id: uuidv4(), ten, diemA, diemB, diemC };
  data.push(newHS);
  fs.writeFileSync(hocSinhFile, JSON.stringify(data, null, 2));
  res.json(newHS);
});

// PUT edit
app.put("/api/hocSinh/:id", (req, res) => {
  const { id } = req.params;
  const { ten, diemA, diemB, diemC } = req.body;
  const data = JSON.parse(fs.readFileSync(hocSinhFile, "utf-8"));
  const index = data.findIndex(h => h.id === id);
  if (index !== -1) {
    data[index] = { id, ten, diemA, diemB, diemC };
    fs.writeFileSync(hocSinhFile, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Học sinh không tồn tại" });
  }
});

// DELETE
app.delete("/api/hocSinh/:id", (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync(hocSinhFile, "utf-8"));
  data = data.filter(h => h.id !== id);
  fs.writeFileSync(hocSinhFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ===== SERVE REACT BUILD =====
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
