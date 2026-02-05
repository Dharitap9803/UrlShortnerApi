const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  // ✅ ADDED: Proper error message
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  // ✅ ADDED: Auto add https:// if missing
  if (!body.url.startsWith("http://") && !body.url.startsWith("https://")) {
    body.url = "https://" + body.url;
  }

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user.userId,
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
