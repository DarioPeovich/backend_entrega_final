import { Router } from "express";

import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";


const router = Router();

const productMangerDB = new ProductManagerDB();

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category, price } = req.query;
    console.log("limit:" + limit);
    const options = {
      limit: parseInt(limit) ?? 10,
      page: page ?? 1,
      sort: { price: sort === "asc" ? 1 : -1 }, //Ordena x precio y en la query se debe indicar ?sort=asc o ?sort=desc
      lean: true,
    };
    const result = await productMangerDB.getProducts(options);
    const products = result.msg
    

    products.prevLink = "---LINK---";
    products.nextLink = "---LINK---";
    //console.log("products.hasPrevPage:" + products.docs.msg)
    console.log("products.hasNextPage:" )
    console.log(products.hasNextPages)
    console.log("products.hasPrevtPage:" )
    console.log(products.hasPrevPages)
    
    res.render("products", {products} );
    // res.send({
    //   status: "succes",
    //   products,
    // });
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
  } catch {
    console.log("Error en lectura de archivos!!");
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
  } catch {
    console.log("Error en lectura de archivos!!");
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
