import { Router } from "express";
import { UserController } from "../controlador/user.controller.js";

const router = Router();
    router.get("/email", UserController.getEmailUser);      //Ojo debe ir primero, xq si no la solicitud la atrapa la ruta /

    router.get("/", UserController.getUsers);
    
    router.get("/:uid", UserController.getIdUser);

    router.post("/premium/:uid", UserController.changeRole);   

export { router as userRouter };