import { connectDB } from "../config/dbConnection.js";
import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js"
import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js"

connectDB();

export const cartsDao = new CartManagerDB();
export const productsDao = new ProductManagerDB();
