import { Router } from "express";

//import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js"; //07/02/24 pasado a products.controller.js
import { ProductsController } from "../controlador/products.controller.js";

const router = Router();

//const productMangerDB = new ProductManagerDB(); //07/02/24 pasado a products.controller.js
router.get("/", ProductsController.getProducts);    //06/02/24 17:37 probar mi primer controlador


router.get("/:pid", ProductsController.getProductId);

router.post("/", ProductsController.createProduct);

router.put("/:pid", ProductsController.modifProduct);

//Para ingresar un array de Productos desde el body
router.post("/insert", ProductsController.createManyProducts);

router.delete("/:pid", ProductsController.deleteProduct);

export { router as productRouter };
