require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToMongoDB } = require("./backend/connect");
const urlRoute = require("./backend/routes/url");
const authRoute = require("./backend/routes/auth");
const URL = require("./backend/models/url");

const PORT = process.env.PORT || 8001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToMongoDB(process.env.MONGODB_URI || "mongodb://localhost:27017/urlShortenerDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/url", urlRoute);
app.use("/auth", authRoute);

// Redirect short URL
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOne({ shortId });
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error in redirect route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Serve frontend (IMPORTANT FIX)
const frontendPath = path.join(__dirname, "frontend", "dist");

app.use(express.static(frontendPath));

// Express 5 safe fallback
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
