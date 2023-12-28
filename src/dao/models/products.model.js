import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'Products';

const producSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails:{
        type: Array,
        default: []
    },
})

producSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection,producSchema);

export default productsModel;
