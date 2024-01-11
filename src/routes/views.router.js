import { Router } from "express";
import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js";
import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js";
import messagesModel from "../dao/models/messages.model.js"

//import cartsModel from "../dao/models/carts.model.js";
//03/01/2024 Segun Juanma esto tendria que estar dentro de carts.router.js y es logico. Pero como seria la ruta???
const cartManagerDB = new CartManagerDB();
const productMangerDB = new ProductManagerDB();

//03/01/24: Este endPoint se paso a carts.routes.js y se cambia en app.js la ruta del Route
const router = Router();

//Rutas Carrito
router.get("/carts/:cid", async (req, res) => {
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
  
  //Router Productos
  router.get("/products", async (req, res) => {
    try {

      const { limit, page, sort, category, availability, query } = req.query;
      
      const result = await productMangerDB.getProducts(limit,page,sort,category,availability,query);
      
      const products = result.msg;
  
      //Habilitar para la entrega
      res.render("products", {products, user:req.session.user} );
  
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

    //Rutas Chat
    router.get("/chat", (req,res)=>{
      res.render("chat", {});
  })
  
  router.get("/chat/list", async (req,res)=>{
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
  })

  //Rutas Sessions
  const publicAccess = (req,res,next) =>{
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}
const privateAccess = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

router.get('/register', publicAccess, (req,res)=>{
    res.render('register')
});
router.get('/login', publicAccess, (req,res)=>{
    res.render('login')
})
router.get('/',privateAccess, (req,res)=>{
    res.render('profile', {user:req.session.user})
})

export { router as viewsRouter };