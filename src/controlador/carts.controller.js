// import { cartsDao } from "../dao/index.js"   //21/04/24
import { cartService } from "../dao/repository/index.js";


class CartsController{ 

    static getProductsCartId = async (req, res) => {

        const cid = req.params.cid;
        
        try {
          
          //const cart = await cartManagerDB.getIdCart(cid);  //Reemplazado x cartsDao 10/02/24
          //  const cart = await cartsDao.getIdCart(cid);  //21/02/24
          const cart = await cartService.getIdCart(cid);
          
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
        
            //Comentar. es solo para pruebas
        //   res.send({
        //     status: "succes",
        //     msg: `Ruta GET ID CART con ID: ${cid}`,
        //     //cart,
        //     productsAux
        //   });
            //-------Fin solo para pruebas
        } catch (error){
          console.log("Error en lectura de archivos!!. Error:" + error);
        }
      
      }
     
     static getCarts = async (req, res) => {
 
        try {
          //const carts = await cartsModel.find();
          //const carts = await cartManagerDB.getCarts();   //Cambiado por cartsDao 10/02/24
          // const carts = await cartsDao.getCarts();  
          const carts = await cartService.getCarts();
          
          console.log("En  CartsController: " + carts)
          res.send({
            status: "succes",
            carts,
          });
        } catch (error) {
          console.log("Error en lectura de archivos!!. Error ==> " + error);
          res.send({
            status: "Error: " + error,

        })
        }
      }

     static createCart = async (req, res) => {
        // const cart = {
        //   products: [],
        // };
        
        try {
          //const carts = await cartsModel.create(cart);
          //const carts = await cartManagerDB.createCarts();  //Cambiado por cartsDao  10/02/24
          // const carts = await cartsDao.createCarts();    21/02/24
          const cart = await cartService.createCarts();

          res.send({
            status: "succes",
            msg: "Ruta POST CART",
            cart,
          });
        } catch {
          console.log("Error en lectura de archivos!!");
        }
      
      } 

     static cartManyProducts = async (req, res) => {
        try {
      
          const cid = req.params.cid;
          const products = req.body;
      
          //const carts = await cartManagerDB.updateCartMany(cid, products);  //Cambiado por cartsDao 10/04/24
          // const carts = await cartsDao.updateCartMany(cid, products);    21/02/24
          const carts = await cartService.updateCartMany(cid, products);
          res.send({
            status: "succes",
            msg: "Ruta POST CART",
            carts,
          });
        }  catch (error) {
          console.error("Error:", error.message);
          res.status(404).send({
              status: "error",
              msg: error.message,
          });
        }
      }

     static cartAgregateProduct = async (req, res) => {
        //creo
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
          try {
              //const result = await cartManagerDB.updateCart(cid, pid, quantity);  //Cambiado x cartsDao  10/02/24
              // const result = await cartsDao.updateCart(cid, pid, quantity);
              const result = await cartService.updateCart(cid, pid, quantity);

              //console.log(result);
              res.send({
                  status: "succes",
                  msg: `Ruta POST CART - Agrego producto al carrito. CID: ${cid} - PID: ${pid}`,
                  result,
                });
             }
             catch (error) {
              console.error("Error:", error.message);
              res.status(404).send({
                  status: "error",
                  msg: error.message,
              });
          }
      
      }

    static cartDelete = async (req, res) => {
        const cid = req.params.cid;
        try {
          //let result = await cartsModel.deleteOne({_id:cid})
          //const result = await cartManagerDB.deleteCart(cid)    //Cambiado x cartsDao 10/02/24
          // const result = await cartsDao.deleteCart(cid)  //21/02/24
          const result = await cartService.deleteCart(cid);
          res.send({
            status: "succes",
            msg: `Ruta DELETE de CART con ID: ${cid}`,
          });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(404).send({
                status: "error",
                msg: error.message,
            });
        }
      
      }

     static cartProductDelete = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        try {
          //let result = await cartsModel.deleteOne({_id:cid})
          //const result = await cartManagerDB.deleteProductCart(cid, pid);  //cambiado x cartsDao 10/02/24
          // const result = await cartsDao.deleteProductCart(cid, pid);
          const result = await cartService.deleteCart(cid);
          res.send({
            status: "succes",
            msg: `Ruta DELETE de producto con ID ${pid} en el carrito con ID: ${cid} y `,
          });
        }  catch (error) {
          console.error("Error:", error.message);
          res.status(404).send({
              status: "error",
              msg: error.message,
          });
      }
      
      }

}
export {CartsController}