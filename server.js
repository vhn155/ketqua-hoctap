// 📁 server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
const hocSinhRoutes = require("./routes/hocSinh");
const authRoutes = require("./routes/auth");

app.use("/api/hocSinh", hocSinhRoutes);
app.use("/api/auth", authRoutes);

// ===== SERVE REACT BUILD =====
const clientPath = path.join(__dirname, "client", "build");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
