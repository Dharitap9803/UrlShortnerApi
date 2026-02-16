const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const shortid = require("shortid");

const { checkAuth, optionalAuth } = require("../middlewares/auth");

// POST /url - Shorten a URL (optional auth: associates link with user if logged in)
router.post("/", optionalAuth, async (req, res) => {
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

// PATCH /url/:id - Update a link (title, tags, optional new back-half/shortId)
router.patch("/:id", checkAuth, async (req, res) => {
  try {
    const link = await URL.findOne({ shortId: req.params.id, createdBy: req.user.userId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }
    const { title, tags, backHalf } = req.body;
    if (title !== undefined) link.title = title;
    if (Array.isArray(tags)) link.tags = tags;
    if (backHalf !== undefined && typeof backHalf === "string" && backHalf.trim()) {
      const slug = backHalf.trim().replace(/[^a-zA-Z0-9-_]/g, "");
      if (slug) {
        const existing = await URL.findOne({ shortId: slug });
        if (existing && existing._id.toString() !== link._id.toString()) {
          return res.status(400).json({ error: "This back-half is already in use" });
        }
        link.shortId = slug;
      }
    }
    await link.save();
    res.json(link);
  } catch (error) {
    console.error("Error updating link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
