"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artworkValidator = (req, res, next) => {
    const submittedFiles = req.files;
    if (typeof submittedFiles["artwork"] === "undefined") {
        return res.status(400).json({ message: "artwork is required" });
    }
    const artwork = submittedFiles["artwork"][0];
    if (!artwork.originalname.endsWith(".jpg"))
        return res.status(400).json({ message: "artwork must be a jpg file " });
    next();
};
exports.default = artworkValidator;
