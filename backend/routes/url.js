const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const shortid = require("shortid");

// Import the checkAuth middleware
const { checkAuth } = require("../middlewares/auth");

// POST /url - Shorten a URL
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();
    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.userId || null,
    });

    res.status(201).json({ id: shortId });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /url/user - Get all links for a user (requires authentication)
router.get("/user", checkAuth, async (req, res) => {
  try {
    const links = await URL.find({ createdBy: req.user.userId });
    res.json({ links });
  } catch (error) {
    console.error("Error fetching user links:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /url/:id - Get details of a single link (requires authentication)
router.get("/:id", checkAuth, async (req, res) => {
  try {
    const link = await URL.findOne({ shortId: req.params.id, createdBy: req.user.userId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.json(link);
  } catch (error) {
    console.error("Error fetching link details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
