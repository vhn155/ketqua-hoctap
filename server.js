
// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ===== API ROUTES =====
const hocSinhRoutes = require("./routes/hocSinh");
const authRoutes = require("./routes/auth");

app.use("/api/hocSinh", hocSinhRoutes);
app.use("/api/auth", authRoutes);

// ===== SERVE REACT BUILD =====
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));

// Nếu không phải API → trả về index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
