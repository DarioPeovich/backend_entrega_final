import { Router } from "express";

import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";



const router = Router();

//
const productMangerDB = new ProductManagerDB();

//03/01/24: Este endPoint se paso a productRouter.js no tenia sentido tenerlo separado
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
