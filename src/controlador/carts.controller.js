// import { cartsDao } from "../dao/index.js"   //21/04/24
import { cartService } from "../dao/repository/index.js";
import { productsService } from "../dao/repository/index.js";
import productsModel from "../dao/models/products.model.js";
import { v4 as uuidv4 } from "uuid";
import { ticketsModel } from "../dao/models/ticket.model.js";

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
          
          //console.log("En  CartsController: " + carts)
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
              //Se valida que un un usuario poremium no pueda agregar a su carrito un producto que le pertenece
              const product = await productsService.getProductById(pid);
              if (req.user.role = "PREMIUM") {
                  if (product.owner === req.user.email) {
                      return res.status(403).send({
                        status: "error",
                        msg: `Ruta POST CART - Agrego producto al carrito. CID: ${cid} - PID: ${pid}. No se puede agregar un producto propio`,
                      });
                   }
      
                  }

              const result = await cartService.updateCart(cid, pid, quantity);

              //console.log(result);
              res.status(200).send({
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
      //--purchase
      static purchase = async (req,res) => {
        console.log("Entre en purchase")
        try {
            const cartId = req.params.cid;
            const cart = await cartService.getIdCart(cartId);
            //console.log("Entre a carts.controllers.js => purchase", cartId)
            if(cart){
                if(!cart.products.length){
                    return res.send({status:"error", error:"es necesario que agrege productos antes de realizar la compra"})
                }
                const ticketProducts = [];
                const rejectedProducts = [];

                for(let i=0; i<cart.products.length;i++){
                    const cartProduct = cart.products[i];
                    
                    // console.log(JSON.stringify(cart.products[i].product._id,null,'\t'));
                    const productId = cart.products[i].product._id;   //Esto pasa porque se usa populate en el models para enlazar el objeto Product segun su Id
                    //const productDB = await productsModel.findById(cartProduct.id);   //22/02/24
                    const productDB = await productsService.getProductById(productId);

                    //comparar la cantidad de ese producto en el carrito con el stock del producto
                    if(cartProduct.quantity<=productDB.stock){
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                }
                
                console.log("ticketProducts",ticketProducts);
                console.log("rejectedProducts",rejectedProducts);
                
                const totalTicket = await CartsController.totalTicket(ticketProducts);
                //console.log("ticketProducts",ticketProducts);
                if (totalTicket == 0) {
                  return res.send({status:"error", error:"Todas las quantity de los productos, están por encima de su respectivos Stock "});
                }
                // console.log("req.user.email", req.user.email )
                
                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date(),   //.toLocaleString(),
                    amount:totalTicket,
                    purchaser: req.user.email   
                }
                const ticketCreated = await ticketsModel.create(newTicket);
                //console.log("carts.controllers.js => purchase", ticketCreated);
                const resultStk = await CartsController.actualizarStock(ticketProducts);    //Se actualiza el Stock de los articulos
                const resultCartAct = await CartsController.actualizarCart(cartId, ticketProducts, rejectedProducts);   //Se borra los productos que se incluyeron  en el Ticket
                res.send({status:"success", ticketCreated, rejectedProducts})
            } else {
                return res.send({status:"error", error:"el carrito no existe"})
            }
        } catch (error) {
            return res.send(error.message)
        }
    }
    
    static actualizarStock = async (ticketProducts) => {
      ticketProducts.forEach(async (product) => { // Utiliza async aquí para poder usar await dentro de la función de devolución de llamada
        try {
          const productDB = await productsService.getProductById(product.product); 
          productDB.stock -= product.quantity;
          // Llama a la función updateProduct
          const result = await productsService.updateProduct(productDB._id, productDB);
          console.log(`Stock actualizado para ${productDB.title}`);
        } catch (error) {
          console.error(`Error actualizando el stock para ${product.title}: ${error.message}`);
        }
      });
    };
    
    static actualizarCart = async (cartId, ticketProducts) => {
      try {
        //Se borran los productos que fueron incluidos en el ticket
        ticketProducts.forEach(async (product) => {
          const result = await cartService.deleteProductCart(cartId, product.product._id)   
        })

      } catch (error) {
        console.error(`Error actualizando el stock para  ${error.message}`);
        throw error;
      }
    
    }
    
    static totalTicket = async (ticketProducts) => {
      try {
          let totalTicket = 0;
          ticketProducts.forEach(async (product) => {
            totalTicket += product.quantity * product.product.price;
            // console.log("totalTicket:", totalTicket);
          });
          return totalTicket;
      } catch (error) {
        throw error;
      }
    }

}
export {CartsController}


