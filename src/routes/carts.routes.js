import { Router } from "express";
import {CartsController} from "../controlador/carts.controller.js"

const router = Router();

router.get("/:cid", CartsController.getProductsCartId);

router.get("/", CartsController.getCarts);


//Se crea el Carrito, con array products vacio
router.post("/", CartsController.createCart);

//Se agrega al Carrito, un array de productos, que viene del body
router.post("/:cid", CartsController.cartManyProducts);

router.post("/:cid/product/:pid", CartsController.cartAgregateProduct);

router.delete("/:cid", CartsController.cartDelete);

router.delete("/:cid/product/:pid", CartsController.cartProductDelete);

export { router as cartRouter };
