"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wavfileValidator = (req, res, next) => {
    const submittedFiles = req.files;
    if (typeof submittedFiles["wav"] !== "undefined") {
        const wav = submittedFiles["wav"][0];
        if (!wav.originalname.endsWith(".wav"))
            return res.status(400).json({ message: "wav file is required" });
    }
    next();
};
exports.default = wavfileValidator;
