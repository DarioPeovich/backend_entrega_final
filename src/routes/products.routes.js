import { Router } from "express";

import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";


const router = Router();

const productMangerDB = new ProductManagerDB();

router.get("/", async (req, res) => {
  
  try {
    const products = await productMangerDB.getProducts();
    res.send({
      status: "succes",
      products,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
    return res.status(400).send({ error: "Error en lectura de archivos" });
        
    }
});



router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  if (!pid) {
    return res.status(400).send({ error: "Debe ingresar Id. Product" });
  }
  
  try {
    const product = await productMangerDB.getProductById(pid);
    
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
});

router.post("/", async (req, res) => {
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
   
    const result = await productMangerDB.createProduct(product);
    res.send({
      status: "succes",
      msg: "Producto creado",
      result,
    });
  } catch {
    console.log("Error en lectura de archivoss!!");
  }
});

router.put("/:pid", async (req, res) => {
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
    const result = await productMangerDB.updateProduct(pid, product)
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
});

//Para ingresar un array de Productos desde el body
router.post("/insert", async (req, res) => {
  const product = req.body;
  
  try {
    const result = await productsModel.insertMany(product);
    res.send({ result });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  if (!pid) {
    return res.status(400).send({ error: "Debe ingresar Id. Product" });
  }
  try {
  
    const result = await productMangerDB.deleteProduct(pid);
    
    res.send({
      status: "succes",
      msg: `Ruta DELETE de PRODUCTS con ID: ${pid}`,
      result,
    });
  } catch {
    console.log("Error en lectura de archivos!!");
  }
});

export { router as productRouter };
