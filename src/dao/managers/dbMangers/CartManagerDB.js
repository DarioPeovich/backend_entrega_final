import productsModel from "../../models/products.model.js";
import cartsModel from "../../models/carts.model.js";
import { productsDao } from "../../index.js";

class CartManagerDB {
  getCarts = async () => {
    try {
      const carts = await cartsModel.find()
      .lean()
      .populate({
         path: 'products.product',
        model: productsModel
     });
      return carts;
    } catch (error) {
      console.error("Error fetching carts:", error);
      // Manejar el error según sea necesario
    }
  };

  getIdCart = async (idCart) => {
    
    try {
      //Si no tiene lean NO ANDA HANDLEBARS, EL PROFESOR LO DIJO EN CLASES Y YO NO LO HICE. RENEGUE DOS DIAS COMPLETOS
       //const cart = await cartsModel.findById(idCart).lean();
       const cart = await cartsModel.findById(idCart)
        .lean()
        .populate({
           path: 'products.product',
          model: productsModel
       });
      if (!cart) {
        throw new Error(`No se encontró ningún carrito con el ID: ${idCart}`);  //se lanza una excepcion, para capturarla desde el Route
      }
      return cart;
      
    } catch (error) {
      console.error("Error en CartManagerDB.js getIdCart:", error);
      throw error;
      }
  };

  createCarts = async () => {
    const cart = {
      products: [],
      quantity:0
    };
    try {
      const carts = await cartsModel.create(cart);
      return carts;
    } catch {}
  };

  updateCart = async (idCart, idProduct, quantity = 1) => {
    
    try {
      const cart = await cartsModel.findById({ _id: idCart });
      
      if (!cart) {  //Si no existe el carrito se envio error
        //console.log("el id Carrito no existe")
        throw new Error(`No se encontró ningún carrito con el ID: ${idCart}`);  //se lanza una excepcion, para capturarla desde el Route
      }
   //Se valida si existe el idproducto
   const product = await productsDao.getProductById(idProduct)
   
   
    if (!product) {
      //console.log("El id. Prducto no existe")
      throw new Error(`No se encontró ningún producto con el ID: ${idProduct}`);  //se lanza una excepcion, para capturarla desde el Route
    }
 
    const productIndex = cart.products.findIndex((productInCart) => {
      return productInCart.product._id.toString() === idProduct.toString();
    });

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      const product = {
        product: idProduct,
        quantity: quantity,
      };
      cart.products.push(product);
    }
    const result = await cartsModel.updateOne({_id:idCart},{$set:cart});
    return result
  } catch (error) {
    throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
    }
  };

updateCartMany = async (idCart, products) => {
    
    // console.log("idCart:" + idCart)
    // console.log(...products)
    try {
      const cart = await cartsModel.findById({ _id: idCart });
      
      if (!cart) {
        throw new Error(`No se encontró ningún carrito con el ID: ${idCart}`);  //se lanza una excepcion, para capturarla desde el Route
        // return res.status(404).send({
        //   status: "error",
        //   msg: `No se encontró ningún carrito con el ID: ${idCart}`,
        // });
      }
      //Se valida que los productos existan en la BD
      for (const productArray of products) {
        //Se valida la existencia del producto 
        //const product = await productManagerDB.getProductById(productArray.idProduct) // 09/04/24 Cambiado por Dao
        const product = await productsDao.getProductById(productArray.idProduct)
        
        if (!product) {
          throw new Error(`No se encontro en la BD un producto con el ID: ${productArray.idProduct}. Se aborta operacion completa!.`);  //se lanza una excepcion, para capturarla desde el Route
   
        }
      }
      // products.array.forEach(productArray => { //forEach no permite el await dentro de su bloque de iteracion

    for (const productArray of products) {
      
      const productIndex = cart.products.findIndex((productInCart) => {
        return productInCart.product._id.toString() === productArray.idProduct.toString();
      });
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += productArray.quantity;
      } else {
        const product = {
          product: productArray.idProduct,
          quantity: productArray.quantity,
        };
        cart.products.push(product);
      }
      const result = await cartsModel.updateOne({_id:idCart},{$set:cart});
    };
    //return result
  } catch (error) {
    throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
 }
  };
  //----Fin "updateCartMany": metodo para agregar array de productos desde body

  //deleteCart: Vacia el carrito de Producto. No lo borra de la BD.
  deleteCart = async (idCart) => {
    try {
      const cart = await this.getIdCart(idCart)
      if (!cart) { 
        throw new Error(`No se encontró ningún carrito con el ID: ${idCart}`);  //se lanza una excepcion, para capturarla desde el Route
        // return res.status(404).send({
        //   status: "error",
        //   msg: `No se encontró ningún carrito con el ID: ${idCart}`,
        // });
      }
      cart.products = [];
      //const result = await cart.save();
      const result = await cartsModel.updateOne({_id:idCart},{$set:cart});
      //const result = await cartsModel.deleteOne({ _id: idCart });
      return result;
    } catch (error) {
        throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
     }
  }

  deleteProductCart = async (idCart, idProduct) => {
    try {
      const cart = await this.getIdCart(idCart)
      if (!cart) { 
        throw new Error(`No se encontró ningún carrito con el ID: ${idCart}`);  //se lanza una excepcion, para capturarla desde el Route
      }
      //const productIndex = cart.products.findIndex((product) => product.id === idProduct);
      const productIndex = cart.products.findIndex((productInCart) => {
        return productInCart.product._id.toString() === idProduct.toString();
      });

      if (productIndex === -1) {
        throw new Error(`No se encontró en el carrito con el ID: ${idCart}, el producto a borrar con id.: ${idProduct}`);  //se lanza una excepcion, para capturarla desde el Route
      }
      cart.products.splice(productIndex, 1)

      //const result = await cart.save();
      const result = await cartsModel.updateOne({_id:idCart},{$set:cart});
      
      return result;
    } catch (error) {
      throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
  }
  }

} //Fin Clase CartManagerDB
export { CartManagerDB };
