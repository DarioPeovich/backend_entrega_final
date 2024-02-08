import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js"
//08/02/24 .JS DEPRECADO. SE DEJA POR BACKUP. SE ELIMINARA PRONTO
const router = Router();

router.get("/", (req,res)=>{
    res.render("chat", {});
})

router.get("/list", async (req,res)=>{
    try {
        let chats = await messagesModel.find();
        res.send({
          status: "succes",
          chats,
        });
      } catch {
        console.log("Error en lectura de archivos!!");
      }

    //res.render("chat", {});
})

export default router;