import express from 'express';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import {productViewsRouter} from "./routes/products.views.router.js"
import {cartViewsRouter} from "./routes/cart.views.router.js"
import mongoose from 'mongoose';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsChatRouter from "./routes/views.chat.router.js"; //to do
import messagesModel from './dao/models/messages.model.js';


const PORT = 8080;
let messages = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(PORT, ()=>{console.log(`Servidor funcionando en el puerto: ${PORT}`);})

//Configurando handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));

//Configurando Mono Atlas
const MONGO =  "mongodb+srv://dariofmpeovich:Cr2S8oiuOf1U9rzf@cluster0.zm3q7vj.mongodb.net/ecommerce";
const connection = mongoose.connect(MONGO);

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Rutas views
app.use("/products", productViewsRouter);
app.use("/carts", cartViewsRouter);

//Ruta Chat
app.use("/chat", viewsChatRouter);

//Configuracion websocket
const io = new Server(httpServer);

io.on("connection", (socket)=>{
    
    socket.on("chat-message", async  (data)=>{
        messages.push(data);
        const message = {
            user: data.username,
            message: data.message
        }

        const result = await messagesModel.create(message);     //Se almacena el mensaje
        //let chats = await messagesModel.find();   //Si uso está funcion, trae todos los mensajes de chat antiguos
        io.emit("messages", messages);
    })

    socket.on("new-user", (username)=>{
        socket.emit("messages",messages);
        socket.broadcast.emit("new-user", username);
    })
})