import { Router } from "express";
import { ProductsController } from "../controlador/products.controller.js";
import { checkRole } from "../middleware/auth.js";

const router = Router();


router.get("/", ProductsController.getProducts);   


router.get("/:pid", ProductsController.getProductId);

router.post("/", checkRole(["ADMIN"]), ProductsController.createProduct);

router.put("/:pid", checkRole(["ADMIN"]), ProductsController.modifProduct);

//Para ingresar un array de Productos desde el body
router.post("/insert", checkRole(["ADMIN"]), ProductsController.createManyProducts);

router.delete("/:pid", checkRole(["ADMIN"]), ProductsController.deleteProduct);

export { router as productRouter };
