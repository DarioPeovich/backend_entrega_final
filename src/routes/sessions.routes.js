import { Router } from "express";
import userModel from '../dao/models/users.model.js'
import {createHash, validatePassword} from "../utils.js"
import passport from "passport";
import {SessionsController} from "../controlador/sessions.controller.js"

const router = Router();


router.post("/register",passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}), SessionsController.sessionsRegister)

router.get("/failregister", SessionsController.sessionsFailRegister)

router.get("/current", SessionsController.sessionsCurrent)

router.post("/login", passport.authenticate("login", {failureRedirect:'/api/session/faillogin'}), SessionsController.sessionsLogin)

router.get("/faillogin", SessionsController.sessionsFailLogin)

router.get('/logout', SessionsController.sessionsLogout)


router.post("/restartPassword", SessionsController.sessionsRestartPassword)

router.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{});

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect("/")
});

export default router;