import express from "express";
const router = express.Router();
import passport from "passport";
import authConroller from "../controllers/authController";
import { Response, Request, NextFunction } from "express";

// router.post('/', (req,res,next)=>{
//     console.log('login called')
//     passport.authenticate('local',(err:any,user:any,info:any)=>{
//         if(!user) return res.status(401).json({'message':'user nor found'})
//         req.logIn(user, (err)=>{
//             if(err) throw err
//             res.status(201).json({'mesage':'user logged'})

//         })
//         } )(req,res,next)

// }
// )

router.post("/", authConroller);

export { router };
