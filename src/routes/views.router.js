import { Router } from "express";
import { ViewsController } from "../controlador/views.controllers.js";
import { authToken } from "../utils.js";
import { checkRole } from "../middleware/auth.js";

const router = Router();

//Rutas Carrito
router.get("/carts/:cid", ViewsController.getViewCartId);

//Router Productos
router.get("/products", authToken, ViewsController.getViewProducts);

router.get("/products/crud",  ViewsController.getViewProducsCrud);
  //Router de pruebas
router.get("/productsagregar",  (req,res)=>{
  res.render('productAgregar',  );
});

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

// router.get("/login", publicAccess, ViewsController.sessionLogin);
router.get("/", publicAccess, ViewsController.sessionLogin);

router.get("/current", privateAccess, ViewsController.sessionProfile); // current
//current authToken, privateAccess  ==> de /current

router.get("/resetPassword", ViewsController.sessionResetPassword);

router.get("/forgotPassword", ViewsController.sessionForgotPassword);

//Vistas Users
router.get("/users", authToken, checkRole(["ADMIN"]), ViewsController.getUsers);

export { router as viewsRouter };
