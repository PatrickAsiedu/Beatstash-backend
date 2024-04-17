"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = void 0;
const handleLogout = (req, res, next) => {
    req.logOut;
    req.session.destroy(function (err) {
        res.clearCookie("connect.sid");
        res.sendStatus(204); //no content
    });
};
exports.handleLogout = handleLogout;
