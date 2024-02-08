import { Router } from "express";

import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";

//****************************************************************************************************** */

//********  08/02/24 .JS ENDPOINT DEPRECADO. SE DEJA POR BACKUP. PRONTO DERA ELIMINADO  ****************

//****************************************************************************************************** */


const router = Router();

//
const productMangerDB = new ProductManagerDB();

//03/01/24: Este endPoint se paso a productRouter.js no tenia sentido tenerlo separado  07/02/24 mmm Tiene que estar acá, o si no pasar a views,router.js
router.get("/", async (req, res) => {
    try {

      const { limit, page, sort, category, availability, query } = req.query;
      
      const result = await productMangerDB.getProducts(limit,page,sort,category,availability,query);
      
      const products = result.msg;
  
      //Habilitar para la entrega
      res.render("products", {products} );
  
      //Comentar, solo para pruebas
      // res.send({
      //   status: "succes",
      //   products,
      // });
      //-------------
  
       } catch (error) {
        console.log("Error en lectura de archivos:", error);
         return res.status(400).send({ error: "Error en lectura de archivos" });
       }
    
    });
  

export { router as productViewsRouter };
