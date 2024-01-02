import { Router } from "express";
import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js";

//import cartsModel from "../dao/models/carts.model.js";

const cartManagerDB = new CartManagerDB();

const router = Router();
router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    
    try {
      //const cart = await cartsModel.findById({ _id: cid });
      const cart = await cartManagerDB.getIdCart(cid);
        // console.log("---Cart---")
        // console.log(cart)
        const products = cart.products;
        //console.log(JSON.stringify(cart,null,'\t'));

        //console.log(JSON.stringify(products,null,'\t'));
        //console.log(JSON.stringify(products[1].product.title,null,'\t'));

        const productsAux = products.map(producto => {
            const prod = {
                title: producto.product.title,
                description: producto.product.description,
                code: producto.product.code,
                price: producto.product.price,
                status: producto.product.status,
                stock: producto.product.stock,
                category: producto.product.category,
                thumbnails: producto.product.thumbnails,
                quantity: producto.quantity
            }
            return (prod);
        })
        
        //console.log("---productsAux---" + JSON.stringify(productsAux,null,'\t') );
        //console.log("Producto 0: " + productsAux[0].title)
         //Habilitar para la entrega
        res.render("cartProducts", {productsAux} );
    
        //Comentar. Solo para pruebas
    //   res.send({
    //     status: "succes",
    //     msg: `Ruta GET ID CART con ID: ${cid}`,
    //     //cart,
    //     productsAux
    //   });
        //-------Fin solo para pruebas
    } catch {
      console.log("Error en lectura de archivos!!");
    }
  
  });
  
export { router as cartViewsRouter };