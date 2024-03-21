import { Router } from "express";
import { ViewsController } from "../controlador/views.controllers.js";

const router = Router();

//Rutas Carrito
router.get("/carts/:cid", ViewsController.getViewCartId);

//Router Productos
router.get("/products", ViewsController.getViewProducts);

//Rutas Chat
router.get("/chat", ViewsController.getViewChat);

router.get("/chat/list", ViewsController.getViewChatList);


//Rutas Sessions
const publicAccess = (req, res, next) => {
  // console.log("en sessions.controller.js. publicAccess", req.user)
  if (req.user) {
    //return res.redirect('/');
  }
  next();
};
const privateAccess = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

//Vistas de Sesion
router.get("/register", publicAccess, ViewsController.sessionRegister);

router.get("/login", publicAccess, ViewsController.sessionLogin);

router.get("/current", ViewsController.sessionProfile); // current
//current authToken, privateAccess  ==> de /current

router.get("/resetPassword", ViewsController.sessionResetPassword);

router.get("/forgotPassword", ViewsController.sessionForgotPassword);

export { router as viewsRouter };
