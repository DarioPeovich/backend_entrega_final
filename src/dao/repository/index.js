import { UserRepository } from "./users.repository.js";
import { userDao } from "../index.js";

import { CartRepository } from "./cart.repositoy.js";
import { cartsDao } from "../index.js";

import { ProductsRepository } from "./products.repository.js";
import { productsDao } from "../index.js";

export const userService = new UserRepository(userDao);      //Inyeccion de independencia
export const cartService = new CartRepository(cartsDao);
export const productsService = new ProductsRepository(productsDao);
