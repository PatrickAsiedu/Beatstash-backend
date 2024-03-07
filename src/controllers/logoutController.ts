import { RequestHandler } from "express";

const handleLogout: RequestHandler = (req, res, next) => {
  req.logOut;
  req.session.destroy(function (err) {
    res.clearCookie("connect.sid");
    res.sendStatus(204); //no content
  });
};

export { handleLogout };
