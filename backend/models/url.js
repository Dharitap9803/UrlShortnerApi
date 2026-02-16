const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    visitHistory: [
        {
            timestamp: { type: Number },
            ipAddress: { type: String },
            userAgent: { type: String },
            country: { type: String },
            city: { type: String },
        }
    ],
    title: { type: String, default: "" },
    tags: [{ type: String }],
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
