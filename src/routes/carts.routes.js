import { Router } from "express";
import {CartsController} from "../controlador/carts.controller.js"
import { checkRole } from "../middleware/auth.js";

const router = Router();

router.get("/:cid", CartsController.getProductsCartId);

router.get("/", CartsController.getCarts);


//Se crea el Carrito, con array products vacio
router.post("/", CartsController.createCart);

//Se agrega al Carrito, un array de productos, que viene del body
router.post("/:cid", checkRole(["USER", "PREMIUM"]), CartsController.cartManyProducts);

router.post("/:cid/product/:pid", checkRole(["USER", "PREMIUM"]), CartsController.cartAgregateProduct);

router.delete("/:cid", CartsController.cartDelete);

router.delete("/:cid/product/:pid", CartsController.cartProductDelete);

router.post("/:cid/purchase",CartsController.purchase);

export { router as cartRouter };
