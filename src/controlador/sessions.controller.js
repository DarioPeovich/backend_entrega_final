import { userService } from "../dao/repository/index.js";
import userModel from "../dao/models/users.model.js";
import { generateToken, authToken } from "../utils.js";     //Para Session
import { createHash } from "../utils.js";
import { generateEmailToken, verifyEmailToken, validatePassword} from "../utils.js";    //Para token envio de eMail
import { sendRecoveryPass } from "../utils/email.js"; 


class SessionsController{ 

    static sessionsRegister = async (req,res) => {
        // El usuario ha sido registrado con éxito, ahora puedes generar el token JWT
        const token = generateToken(req.user);

        // Devuelve el token JWT al cliente
        res.status(200).json({status:"success", token });
        //res.status(200).json({token });
        //res.send({status:"success", message:"User registrado"})
    }

    static sessionsFailRegister = async (req,res)=>{
        console.log('Fallo el registro');
        res.status(400).send({error: 'fallo en el registro'})
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
        //console.log("en sessionsLogin de sessions.controller.js");
        const uid = req.user._id;
        if(!req.user){
            return res.status(400).send({status:"error"})
        }
        //console.log("En sessions.controller.js req.user: ", req.user);
        const token = generateToken(req.user);
        //console.log("En sessions.controller.js token: ", token);
        const user = await userService.getIdUser(uid);
        //console.log("=====user======", user);
        user.last_connection = Date.now();
        const userUpdate = await userService.updateUser(uid, user);

        res.status(200).send({status:"success", token})
    }


    static sessionsFailLogin = (req,res)=>{
        //console.log("Pase x sessionsFailLogin, en sessions.controller.js")
        return res.status(400).send({error:"fail login"})
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

    static forgotpassword = async (req,res)=>{
        try {
            const {email} = req.body;
            const user = await userModel.findOne({email});
            
            if(!user){
                res.send(`<div>Error no existe el usuario, vuelva a intentar: <a href="/forgot-password">Intente de nuevo</a></div>`)
            }
            
            const token = generateEmailToken(email, 3600);
            //console.log('object');
            await sendRecoveryPass(email, token);
            res.send("Se envio el correo de recuperacion.")
    
        } catch (error) {
            
            res.send(`<div>Error,<a href="/forgot-password">Intente de nuevo</a></div>`)
        }
    
    }

    static sessionsRestartPassword = async (req,res)=>{

        //const token = req.query.token;
        
        const {email,newPassword, token} = req.body;

        const validToken = await verifyEmailToken(token);
        //console.log("En controller sessionsRestartPassword, validToken: ", validToken)
        if(!validToken || validToken == null){
            //console.log("token no valido")
            return res.status(401).send({status:"error",
            message: `El token ya no es valido. Intente la restauracion nuevamente!`});
        }

        if (!email || !newPassword) {
            //console.log("falta email o PassWord")
            return res.status(400).send({
                status: "error",
                message: "Datos incorrectos. Falta eMail o passWord"
            });
        }
        
        
        const user = await userModel.findOne({email});
        
        if (!user) {
            //console.log("Usuario no hallado")
            return res.status(400).send({
                status: "error",
                message: "No existe el usuario"
            });
        }
        
        //Si la validacion del nuevo  passWord con el antigüo da Ok, quiere decir que se está utilizando el mismo passWord anterior
        if(validatePassword(newPassword,user)){
            return res.status(400).send({status: "error", message:"no se puede usar la misma contraseña"})
        }

        //Se hashea el password
        const newHashPassword = createHash(newPassword);
    
        await userModel.updateOne({_id:user._id},{$set:{password:newHashPassword}});
        res.status(200).send({
            status:"success",
            message:"contraseña restaurada"
        })
    }
 
}

export {SessionsController};