// 📁 server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// === ROUTES ===
const authRoutes = require("./routes/auth");
const hocSinhRoutes = require("./routes/hocSinh");

app.use("/api/auth", authRoutes);
app.use("/api/hocSinh", hocSinhRoutes);

// === SERVE REACT BUILD ===
const clientPath = path.join(__dirname, "client", "build");
app.use(express.static(clientPath));

// Trả về React app cho mọi route không thuộc API
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
