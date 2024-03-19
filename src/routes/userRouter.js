import { Router } from "express";
import { UserController } from "../controlador/user.controller.js";

const router = Router();
    router.post("/premium/:uid", UserController.changeRole);   

export { router as userRouter };