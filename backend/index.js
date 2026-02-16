require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const authRoute = require("./routes/auth");
const URL = require("./models/url");

const PORT = process.env.PORT || 8001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (uses MONGODB_URI from .env, fallback to local)
connectToMongoDB(process.env.MONGODB_URI || "mongodb://localhost:27017/urlShortenerDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/url", urlRoute);
app.use("/auth", authRoute);

// Redirect route for short URLs
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error in redirect route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Serve frontend build files (Vite dist folder)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
