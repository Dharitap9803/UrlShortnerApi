const express = require("express");
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
const urlRoute = require("./routes/url");
const authRoute = require("./routes/auth");
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/urlShortenerDB')
.then(() => console.log("Mongodb connected"));

app.use(express.json());
app.use("/url", urlRoute);
app.use("/auth", authRoute);


// Redirect Route
app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    let redirectURL = entry.redirectURL;

    if (
        !redirectURL.startsWith("http://") &&
        !redirectURL.startsWith("https://")
    ) {
        redirectURL = "https://" + redirectURL;
    }

    res.redirect(redirectURL);
});

app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));

