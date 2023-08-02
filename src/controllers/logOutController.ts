import { Request,Response, NextFunction } from "express";

const logOutControlller = ( req:Request, res:Response ,next: NextFunction)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
   
      });
      res.clearCookie("connect.sid")

      res.sendStatus(204)
    // req.session.destroy( function (err){
    //     res.clearCookie("connect.sid")
    //     res.status(204)

    // });


    


}


export default logOutControlller