import path from "path";
import dotenv from "dotenv";
import { Command } from "commander";
import __dirname from "../utils.js";


const program = new Command();

program
.option("-mode <modo>","Modo de inicio","dev")
program.parse();

const environment = program.opts();

//const pathEnvironment = environment.Mode === "prod" ? path.join(__dirname,"../.env.production") : path.join(__dirname,"../.env.development");
const pathEnvironment = path.join(__dirname,"../.env");     //ES PARA CUMPLIR CON LAS PREMISAS DEL DESAFIO
console.log(pathEnvironment);

dotenv.config({path:pathEnvironment})

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CORREO_ADMIN = process.env.CORREO_ADMIN;
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
const JWT_WORD = process.env.JWT_WORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

export const config = {
    server: {
        port: PORT
    },
    mongo:{
        url: MONGO_URL
    },
    auth:{
        account: CORREO_ADMIN,
        pass: PASSWORD_ADMIN
    },
    session:{
        secret:SESSION_SECRET
    },
    jwt:{
        word: JWT_WORD
    }
};
