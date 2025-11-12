// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// ===== FILES =====
const HOCSINH_FILE = path.join(__dirname, "data.json");
const USERS_FILE = path.join(__dirname, "users.json");

// ===== HELPER =====
const readData = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ===== AUTH =====
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const users = readData(USERS_FILE);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  res.json({ username: user.username });
});

app.post("/api/auth/logout", (req, res) => res.json({ message: "Logged out" }));

// ===== HOCSINH CRUD =====
app.get("/api/hocSinh", (req, res) => {
  const { search } = req.query;
  let data = readData(HOCSINH_FILE);
  if (search) {
    const key = search.toLowerCase();
    data = data.filter(h => h.ten.toLowerCase().includes(key));
  }
  res.json(data);
});

app.post("/api/hocSinh", (req, res) => {
  const { ten, diemA, diemB, diemC } = req.body;
  const data = readData(HOCSINH_FILE);
  const newHS = { id: uuidv4(), ten, diemA, diemB, diemC };
  data.push(newHS);
  writeData(HOCSINH_FILE, data);
  res.json(newHS);
});

app.put("/api/hocSinh/:id", (req, res) => {
  const { id } = req.params;
  const { ten, diemA, diemB, diemC } = req.body;
  const data = readData(HOCSINH_FILE);
  const index = data.findIndex(h => h.id === id);
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy học sinh" });
  data[index] = { id, ten, diemA, diemB, diemC };
  writeData(HOCSINH_FILE, data);
  res.json(data[index]);
});

app.delete("/api/hocSinh/:id", (req, res) => {
  const { id } = req.params;
  let data = readData(HOCSINH_FILE);
  data = data.filter(h => h.id !== id);
  writeData(HOCSINH_FILE, data);
  res.json({ message: "Đã xóa" });
});

// ===== SERVE REACT BUILD =====
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));
app.get("*", (req, res) => res.sendFile(path.join(clientBuildPath, "index.html")));

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
