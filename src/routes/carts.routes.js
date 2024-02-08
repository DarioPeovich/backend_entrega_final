import { Router } from "express";
// import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js";
import {CartsController} from "../controlador/carts.controller.js"

//import cartsModel from "../dao/models/carts.model.js";

// const cartManagerDB = new CartManagerDB();

const router = Router();

router.get("/:cid", CartsController.getProductId);

router.get("/", CartsController.getProducts);


//Se crea el Carrito, con array products vacio
router.post("/", CartsController.createCart);

//Se agrega al Carrito, un array de productos, que viene del body
router.post("/:cid", CartsController.cartManyProducts);

router.post("/:cid/product/:pid", CartsController.cartAgregateProduct);

router.delete("/:cid", CartsController.cartDelete);

router.delete("/:cid/product/:pid", CartsController.cartProductDelete);

export { router as cartRouter };
