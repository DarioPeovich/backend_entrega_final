import { Router } from "express";
import userModel from '../dao/models/users.model.js'
import {createHash, validatePassword} from "../utils.js"
import passport from "passport";
import {SessionsController} from "../controlador/sessions.controller.js"
import { authToken } from "../utils.js";
import { uploader } from "../utils.js";


const router = Router();
const publicAccess = (req,res,next) =>{
    if(req.user){
        return res.redirect('/');
    }
    next();
}
const privateAccess = (req,res,next) =>{
    if(!req.user){
        return res.redirect('/');
    }
    next();
}

router.post("/register", uploader.single('thumbnail'), passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}), SessionsController.sessionsRegister)

router.get("/failregister", SessionsController.sessionsFailRegister)


router.get("/current", authToken, SessionsController.sessionsCurrent)

router.post("/login", passport.authenticate("login", {failureRedirect:'/api/sessions/faillogin'}), SessionsController.sessionsLogin)


router.get("/faillogin", SessionsController.sessionsFailLogin)

router.get('/logout', SessionsController.sessionsLogout)

router.post("/forgotPassword", SessionsController.forgotpassword);

router.post("/restartPassword", SessionsController.sessionsRestartPassword)

router.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{});

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:'/'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect("/")
});

export default router;