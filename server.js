// 📁 server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ===== ROUTES =====
const hocSinhRoutes = require("./routes/hocSinh");
const authRoutes = require("./routes/auth");

app.use("/api/hocSinh", hocSinhRoutes);
app.use("/api/auth", authRoutes);

// ===== SERVE REACT BUILD =====
const clientPath = path.join(__dirname, "client", "build");
app.use(express.static(clientPath));

// Bất kỳ route nào không phải API => trả về React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
