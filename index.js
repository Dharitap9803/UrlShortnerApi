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

// Serve frontend build files (Vite dist folder) - must come before API routes
const frontendDistPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDistPath));

// API Routes
app.use("/url", urlRoute);
app.use("/auth", authRoute);

// Redirect route for short URLs (must come before catch-all)
app.get("/:shortId", async (req, res) => {
  try {
    // Skip if it's an API route or static file
    if (req.path.startsWith("/url") || req.path.startsWith("/auth") || req.path.includes(".")) {
      return res.status(404).json({ error: "Not found" });
    }

    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      // If no short URL found, serve React app
      const indexPath = path.join(frontendDistPath, "index.html");
      return res.sendFile(indexPath);
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error in redirect route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// React fallback route - serve index.html for all other routes
app.get("*", (req, res) => {
  const indexPath = path.join(frontendDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(404).json({ 
        error: "Frontend build not found. Please ensure the frontend has been built.",
        path: frontendDistPath
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
