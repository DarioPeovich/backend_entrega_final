import { connectDB } from "../config/dbConnection.js";
import { CartManagerDB } from "../dao/managers/dbMangers/CartManagerDB.js"
import { ProductManagerDB } from "../dao/managers/dbMangers/ProductManagerDB.js"
import { UserManagerDB } from "./managers/dbMangers/userManager.js";

connectDB();

export const cartsDao = new CartManagerDB();
export const productsDao = new ProductManagerDB();
export const userDao = new UserManagerDB();
