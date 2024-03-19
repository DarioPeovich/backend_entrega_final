import { Router } from "express";
import { ProductsController } from "../controlador/products.controller.js";
import { checkRole } from "../middleware/auth.js";
import { generateProduct } from "../utils.js";

const router = Router();


router.get("/", ProductsController.getProducts);   


router.get("/:pid", ProductsController.getProductId);

router.post("/", checkRole(["ADMIN", "PREMIUM"]), ProductsController.createProduct);

router.put("/:pid", checkRole(["ADMIN", "PREMIUM"]), ProductsController.modifProduct);

//Para ingresar un array de Productos desde el body
router.post("/insert", checkRole(["ADMIN"]), ProductsController.createManyProducts);

router.delete("/:pid", checkRole(["ADMIN", "PREMIUM"]), ProductsController.deleteProduct);

router.get("/mock/mockingproducts/", (req,res)=>{
    console.log("Entre a mockingProducts")
    const cant = parseInt(req.query.cant) || 100;
    let products = [];
    for (let i = 0; i < cant; i++) {
        const product = generateProduct();
        products.push(product);
    }
    res.json({status:"success", payload: products})

})

//router.post("/prueba/pruebaerror", ProductsController.pruebaError);

router.post("/prueba/pruebaerror", async (req, res, next) => {
    // try {
        // const error = new Error("mensajeDeError");
        const error = Error("¡Fui creado usando una llamada a función!");
        throw error;
        // CustomError.createError({
        //   name:"Product create error",
        //   cause: generateUserErrorInfo(req.body),
        //   message:"Error creando el Producto",
        //   errorCode:EError.INVALID_PARAM          
        // });
        //------------------
        // const mensajeDeError = "Este es un mensaje de error.";
        // console.log("Mensaje de error:", mensajeDeError); // Verificar que el mensaje se asigna correctamente
        // console.trace();
        // const error = new Error(mensajeDeError);
        // throw error;      
        //--------------------------
    // } catch (error) {
    //     console.log("Error en try/cath", error)
    //     //throw error;
    //     next(error); // Llamar a next con el error para que Express lo maneje
    // }

    // CustomError.createError({
    //   name:"Product create error",
    //   cause: generateUserErrorInfo(req.body),
    //   message:"Error creando el Producto",
    //   errorCode:EError.INVALID_PARAM          
      
    // })
});

export { router as productRouter };
