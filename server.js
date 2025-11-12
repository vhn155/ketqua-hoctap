const express = require("express");
const cors = require("cors");
const path = require("path");

// Routes
const hocSinhRoutes = require("./routes/hocSinh");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/hocSinh", hocSinhRoutes);
app.use("/api/auth", authRoutes);

// Serve React build
const clientPath = path.join(__dirname, "client", "build");
app.use(express.static(clientPath));

// React routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
