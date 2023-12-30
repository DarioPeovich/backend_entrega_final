import mongoose from 'mongoose';
import productsModel from './products.model.js';

const collection = 'Carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: {
            type: Number,
            required: true
          },
        },
      ],
      
})

//Esto es para que cuando mongoose traiga un carrito, tambien traiga el objeto Producto, que esta referenciado por: type: mongoose.Schema.Types.ObjectId, + ref: "products",
// cartSchema.pre("find", function() {
//   this.populate({
//     path: "products.product",
//     model: productsModel,
//   });
// });

//----Asi el populate no funcionaba, no anduvo hasta que no le indique path: "products.product" y de que modelo lo obtenia model: productsModel. Mucho tiempo perdi por esto
// cartSchema.pre("find", function(){
//   this.populate("products.product");
// })
//------
const cartsModel = mongoose.model(collection,cartSchema);

export default cartsModel;
