// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const hocSinhRoutes = require("./routes/hocSinh");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/hocSinh", hocSinhRoutes);
app.use("/api/auth", authRoutes);

// Serve React build
const buildPath = path.join(__dirname, "client", "build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
