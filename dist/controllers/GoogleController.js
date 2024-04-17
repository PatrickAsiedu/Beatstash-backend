"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRedirect = void 0;
const handleRedirect = (req, res, next) => {
    res.redirect("http://localhost:3000");
    console.log(req.isAuthenticated());
};
exports.handleRedirect = handleRedirect;
