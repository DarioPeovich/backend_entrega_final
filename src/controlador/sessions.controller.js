import { userService } from "../dao/repository/index.js";

class SessionsController{ 

    static sessionsRegister = async (req,res) => {
        res.send({status:"success", message:"User registrado"})
    }

    static sessionsFailRegister = async (req,res)=>{
        console.log('Fallo el registro');
        res.send({error: 'fallo en el registro'})
    }

    static sessionsCurrent = async (req,res)=>{

        const user = req.session.user;
   
        
        if (!user) {
            res.send({
                status: "error",
                msg: "No hay usuario activo"
            });
        }
        user = await userService.getEmailUser(req.session.user.email)
        res.send({
            status: "succes",
            msg: "Usuario actual",
            user
          });
    }

    static sessionsLogin = async (req,res) =>{ 
        //console.log("en sessions.controller");
        if(!req.user){
            return res.status(400).send({status:"error"})
        }
        req.session.user ={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age:req.user.age,
            email:req.user.email,
            role: req.user.role
        }
        res.send({status:"success", payload: req.session.user})
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