//import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";   //Cambiado por productsDao 10/02/24
//import { productsDao } from "../dao/index.js";  //21/02/24
import { productsService } from "../dao/repository/index.js";

import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateUserErrorInfo } from "../services/productErrorInfo.js";

//const productMangerDB = new ProductManagerDB();   //Cambiado por productsDao 10/02/24

class ProductsController{

  static getProducts = async (req, res) => {
    try {
  
      const { limit, page, sort, category, availability, query } = req.query;
      
      //const result = await productMangerDB.getProducts(limit,page,sort,category,availability,query);  //Cambiado x productsDao 10/02/04
      // const result = await productsDao.getProducts(limit,page,sort,category,availability,query);
      const result = await productsService.getProducts(limit,page,sort,category,availability,query);
      
      const products = result.msg;
  
      //Habilitar para la entrega
      //res.render("products", {products} );
  
      //Comentar, solo para pruebas
      res.send({
        status: "succes",
        products,
      });
      //-------------
  
       } catch (error) {
        console.log("Error en lectura de archivos:", error);
         return res.status(400).send({ error: "Error en lectura de archivos" });
       }
    
    }  

    static getProductId = async (req, res) => {
      const pid = req.params.pid;
      if (!pid) {
        return res.status(400).send({ error: "Debe ingresar Id. Product" });
      }
      
      try {
        //const product = await productMangerDB.getProductById(pid);    //Cambiado x productsDao 10/02/04
        // const product = await productsDao.getProductById(pid);
        const product = await productsService.getProductById(pid);
        res.send({
          status: "succes",
          msg: "Product hallado",
          product,
        });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(404).send({
            status: "error",
            msg: error.message,
        });
      }
    }

    static createProduct = async (req, res) => {
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = req.body; //json con el producto
      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        CustomError.createError({
          name:"Product create error",
          cause: generateUserErrorInfo(req.body),
          message:"Error creando el Producto",
          errorCode:EError.INVALID_PARAM          
        })
        //return res.status(400).send({ error: "Datos incompletos" });
      }
    
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };
      try {
       
        //const result = await productMangerDB.createProduct(product);    //Cambiado x productsdao 10/02/24
        // const result = await productsDao.createProduct(product);
        const result = await productsService.createProduct(product);
        res.send({
          status: "succes",
          msg: "Producto creado",
          result,
        });
      } catch {
        console.log("Error en lectura de archivoss!!");
      }
    }

    static modifProduct = async (req, res) => {
      const pid = req.params.pid;
    
      if (!pid) {
        return res.status(400).send({ error: "Debe ingresar Id. Product" });
      }
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = req.body; //json con el producto
      if (
        !title || !description ||!code || !price || !status || !stock || !category) {
        return res.status(400).send({ error: "Datos incompletos" });
      }
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };
      
      try {
        //const result = await productMangerDB.updateProduct(pid, product)  //Cambiado x productsDao 10/02/24
        // const result = await productsDao.updateProduct(pid, product)
        const result = await productsService.updateProduct(pid, product)
        res.send({
          status: "succes",
          msg: `Ruta PUT de PRODUCTS con ID: ${pid}`,
          result,
        });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(404).send({
            status: "error",
            msg: error.message,
        });
      }
    }

    static createManyProducts = async (req, res) => {
      const product = req.body;
      
      try {
        //const result = await productsModel.insertMany(product);   //cambiado x productsDao 10/02/24
        // const result = await productsDao.insertMany(product);
        const result = await productsService.insertMany(product);
        res.send({ result });
      } catch {
        console.log("Error en lectura de archivos!!");
      }
    }

    static deleteProduct = async (req, res) => {
      const pid = req.params.pid;
    
      if (!pid) {
        return res.status(400).send({ error: "Debe ingresar Id. Product" });
      }
      try {
      
        //const result = await productMangerDB.deleteProduct(pid);  //Cambiado por productsDao 10/02/24
        // const result = await productsDao.deleteProduct(pid);
        const result = await productsService.deleteProduct(pid);
        res.send({
          status: "succes",
          msg: `Ruta DELETE de PRODUCTS con ID: ${pid}`,
          result,
        });
      } catch {
        console.log("Error en lectura de archivos!!");
      }
    }
  //--borrar es para prueba
  static pruebaError = async (req, res) => {
    CustomError.createError({
      name:"Product create error",
      cause: generateUserErrorInfo(req.body),
      message:"Error creando el Producto",
      errorCode:EError.INVALID_PARAM          
      
    })
  }

}


export {ProductsController}