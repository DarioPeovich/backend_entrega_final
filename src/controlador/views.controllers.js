import messagesModel from "../dao/models/messages.model.js"
import { cartsDao } from "../dao/index.js"
import { productsDao } from "../dao/index.js";

class ViewsController{ 

    //Controllers Views Carrito
    static getViewCartId = async (req, res) => {
        const cid = req.params.cid;
        
        try {
          const cart = await cartsDao.getIdCart(cid);
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
      
      }

    //Controllers Views Products
    static getViewProducts = async (req, res) => {
        try {
    
          const { limit, page, sort, category, availability, query } = req.query;
          
          const result = await productsDao.getProducts(limit,page,sort,category,availability,query);
          const products = result.msg;
      
          //Habilitar para la entrega
          res.render("products", {products, user:req.session.user} );
      
          //Es solo para pruebas: Comentar para entregar, 
          // res.send({
          //   status: "succes",
          //   products,
          // });
          //-------------
      
           } catch (error) {
            console.log("Error en lectura de archivos:", error);
             return res.status(400).send({ error: "Error en lectura de archivos" });
           }
        
        }

    //Controllers Views Chat
    static getViewChat = (req,res)=>{
        res.render("chat", {});
    }
    static getViewChatList = async (req,res)=>{
        try {
            let chats = await messagesModel.find();
            res.send({
              status: "succes",
              chats,
            });
          } catch {
            console.log("Error en lectura de archivos!!");
          }
    
        //res.render("chat", {});
    }

    //Controllers Views Session
    static sessionRegister = (req,res)=>{
        res.render('register')
    }

    static sessionLogin = (req,res)=>{
        res.render('login')
    }

    static sessionProfile = (req,res)=>{
        res.render('profile', {user:req.session.user})
    }

    static sessionResetPassword = (req,res)=>{
        res.render("resetPassword");
      }
    
}

export {ViewsController};