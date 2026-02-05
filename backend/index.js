const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const authRoute = require("./routes/auth");

const PORT = 8001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToMongoDB("mongodb://localhost:27017/urlShortenerDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
