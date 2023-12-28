import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
const collection = 'Carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
          id: {
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
cartSchema.pre("find", function(){
  this.populate("products.product");
})


const cartsModel = mongoose.model(collection,cartSchema);

export default cartsModel;
