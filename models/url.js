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

    // ✅ ADDED: Which user created this short URL
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    visitHistory: [
        { 
            timestamp: { type: Number },

            // ✅ ADDED
            ipAddress: { type: String },

            // ✅ ADDED
            userAgent: { type: String }
        }
    ],
},
{ timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
