import express from "express";
const router = express.Router();


import logOutControlller from "../controllers/logOutController";


router.post("/", logOutControlller)


export {router} ;