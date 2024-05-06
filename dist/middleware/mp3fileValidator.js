"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mp3fileValidator = (req, res, next) => {
    const submittedFiles = req.files;
    if (typeof submittedFiles["mp3"] === "undefined") {
        return res.status(400).json({ message: "mp3 file is required" });
    }
    const mp3 = submittedFiles["mp3"][0];
    if (!mp3.originalname.endsWith(".mp3"))
        return res.status(400).json({ message: "mp3 file is required" });
    next();
};
exports.default = mp3fileValidator;
