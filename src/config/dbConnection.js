import mongoose from "mongoose";
//import { config } from './config/config.js';
import { config } from "./config.js";
export const connectDB = async () => {
    try {
        
        //Configurando Mono Atlas
        //const MONGO =  "mongodb+srv://dariofmpeovich:Cr2S8oiuOf1U9rzf@cluster0.zm3q7vj.mongodb.net/ecommerce";
        const MONGO =  config.mongo.url;
        await mongoose.connect(MONGO);
        console.log('Conectado a la base de datos.');
    } catch (error) {
        console.log(`Hubo un error al tratar de conectar a la BD el error: ${error}`);
    }
}