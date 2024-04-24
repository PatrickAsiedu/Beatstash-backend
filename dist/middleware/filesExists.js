"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileExists = (req, res, next) => {
    const submittedFiles = req.files;
    if (Object.values(submittedFiles).length === 0)
        return res.status(400).json({ message: "Missing files" });
    next();
};
exports.default = fileExists;
