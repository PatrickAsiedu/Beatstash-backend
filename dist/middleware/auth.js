"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated = (req, res, next) => {
    // if(req.isAuthenticated()) return res.json({'message':'u have acces'})
    // res.json({'message':'unauthorized'})
    if (req.isAuthenticated()) {
        next();
    }
    else
        return res.json({ message: "unauthorized" });
};
exports.default = isAuthenticated;
