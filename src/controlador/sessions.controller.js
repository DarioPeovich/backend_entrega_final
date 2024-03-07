import { userService } from "../dao/repository/index.js";
import userModel from "../dao/models/users.model.js";
import { generateToken, authToken } from "../utils.js";
import { createHash } from "../utils.js";

class SessionsController{ 

    static sessionsRegister = async (req,res) => {
        // El usuario ha sido registrado con éxito, ahora puedes generar el token JWT
        const token = generateToken(req.user);

        // Devuelve el token JWT al cliente
        res.json({ token });
        //res.send({status:"success", message:"User registrado"})
    }

    static sessionsFailRegister = async (req,res)=>{
        console.log('Fallo el registro');
        res.send({error: 'fallo en el registro'})
    }

   static sessionsCurrent = async (req, res) => {
    let user = req.user;
    if (!user) {
      res.send({
        status: "error",
        msg: "No hay usuario activo",
      });
    }
    
    user = await userService.getEmailUser(req.user.email)
    res.send({ status: "success", payload: user });
   }


    static sessionsLogin = async (req,res) =>{ 
        //console.log("en sessions.controller");
        if(!req.user){
            return res.status(400).send({status:"error"})
        }
        //console.log("En sessions.controller.js req.user: ", req.user);
        const token = generateToken(req.user);
        //console.log("En sessions.controller.js token: ", token);
        
        res.send({status:"success", token})
    }


    static sessionsFailLogin = (req,res)=>{
        res.send({error:"fail login"})
    }

    static sessionsLogout = (req,res)=>{
        req.session.destroy(err=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    error: 'No se pudo desloguear'
                })
            }
            res.redirect('/login')
        })
    }

    static sessionsRestartPassword = async (req,res)=>{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).send(
            res.send({
                status:"error",
                message:"Datos incorrectos"
            })
        )
        const user = await userModel.findOne({email});
        
        if(!user) return res.status(400).send(
            res.send({
                status:"error",
                message:"No existe el usuario"
            })
        )
        const newHashPassword = createHash(password);
    
        await userModel.updateOne({_id:user._id},{$set:{password:newHashPassword}});
        res.send({
            status:"success",
            message:"contraseña restaurada"
        })
    }
    



}

export {SessionsController};