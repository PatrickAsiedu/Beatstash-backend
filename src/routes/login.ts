import express from "express";
const router = express.Router();
import passport from 'passport'

router.post('/', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true

}))

export {router}