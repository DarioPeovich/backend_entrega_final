import { Router } from "express";
import { ProductsController } from "../controlador/products.controller.js";

const router = Router();


router.get("/", ProductsController.getProducts);   


router.get("/:pid", ProductsController.getProductId);

router.post("/", ProductsController.createProduct);

router.put("/:pid", ProductsController.modifProduct);

//Para ingresar un array de Productos desde el body
router.post("/insert", ProductsController.createManyProducts);

router.delete("/:pid", ProductsController.deleteProduct);

export { router as productRouter };
