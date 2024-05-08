import { userDao } from "../dao/index.js";
import { userService } from "../dao/repository/index.js";
import {sendUsereAccountEliminated} from "../../src/utils/email.js"

class UserController {
    static getUsers = async (req, res) => {
        try {
            //userDao.getUsers
            //const users = await userDao.getUsers();
            const users = await userService.getUsers();
            //console.log("Users: ", users)
            return res.status(200).send({status:"succes", users});
        } catch (error) {
            throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
        }
    }

    // static getIdUser = async (req, res) => {
    //     const uid = req.params.uid;
    //     //console.log("En controllers user, uid:", uid)
    //     // const user = await userDao.getIdUser(idUser);
    //     const user = await userService.getIdUser(uid);
    //     return res.status(200).send({status:"succes", user });

    // }
    static getIdUser = async (req, res) => {
        const uid = req.params.uid;
        try {
            const user = await userService.getIdUser(uid);
            return res.status(200).send({ status: "success", user });
        } catch (error) {
            if (error instanceof Error && error.message.includes('No se encontró ningún usuario')) {
                // Manejar el caso específico de que no se encontró ningún usuario
                return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
            } else {
                // Manejar otros errores
                return res.status(500).send({ status: "error", message: "Error al obtener el usuario" });
            }
        }
    }
    
    static getEmailUser = async (req, res) => {
        try {
            const email = req.query.email; // Obtener el parámetro de consulta email
            const user = await userService.getEmailUser(email);
            return res.status(200).send({ status: "success", user });
        } catch (error) {
            console.error("Error en getEmailUser:", error);
            return res.status(500).send({ status: "error", message: "Error interno del servidor" });
        }
    }

    static createUser = async (req, res) => {
        // const user = await userDao.createUser(user);
        const  {
            first_name,
            last_name,
            email,
            password,
            age,
            role
        } = req.body;
        if (!first_name || !last_name || !email || !password || !age) {
            return res.status(401).send({error:"Falta datos del Usuario, nombres o eMail"});
        }
        const user = {
            first_name,
            last_name,
            email,
            password,
            age,
            role
        }
        const result = await userService.createUser(user);
        
        return res.status(200).send({status:"succes", result });
    }

    static deleteUser = async (req, res) => {
        const uid = req.params.uid;
        //console.log("en user.controllers.js uid:", uid)
        if (!uid) {
            return res.status(401).send({error:"Se debe proporcionar un ID de usuario"});
        }
        const result = await userService.deleteUser(uid);
        // console.log("en user.controllers.js result:", result)
        if (result.acknowledged && result.deletedCount > 0) {
            //res.status(200).send({status:"succes", result, message:`Usuario eliminado ${uid}`})
            return res.status(200).send({
                status: "success",
                msg: `Usuario eliminado ${uid}`,
                result
            });
        }else {
            return res.status(401).send({error:"Usuario inexistente"});
        }
    }

    static deleteUserTimeOut = async (req, res) => {

        try {
            const fechaActual = new Date();
            const users = await userDao.getUsers();
    
            for (const user of users) {
                const diferenciaMilisegundos = fechaActual - user.last_connection;
                const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));

                if ( minutos >= 30) {
                // if ( dias >= 9) {
                    //console.log("Usuario: ", user.last_name + " " + user.first_name);
                    //Enviar correo informando que se elimino su cuenta
                    await sendUsereAccountEliminated(user);
                    //Habilitar la linea deleteUser, despues de probar el correo
                    const result = await userService.deleteUser(user._id);
                }
            }
            return res.status(200).send({ status: "success" });
        } catch (error) {
            console.error("Error en deleteUserTimeOut:", error);
            return res.status(500).send({ status: "error", message: "Error interno del servidor" });
        }
    }
    

    // static deleteUserTimeOut = async (req, res) => {
    //     console.log("entre a deleteUserTimeOut, user.controller.js")
    //     try {
    //             const fechaActual = new Date();
    //             const users = await userDao.getUsers();
    //             users.forEach((user) => {
    //                 const diferenciaMilisegundos =
    //                 fechaActual - user.last_connection;
    //                 const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    //                 const horas = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //                 const minutos = Math.floor( (diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    //                 if (dias < 2) {console.log("Usuario: ",user.last_name + " " + user.first_name);
    //                     if (minutos <= 30) {
    //                       const hora = user.last_connection.getHours();
    //                       const minutos = user.last_connection.getMinutes();
    //                       const segundos = user.last_connection.getSeconds();
    //                       console.log(
    //                         `La hora actual es ${hora}:${minutos}:${segundos}`
    //                       );
    //                       console.log("Se conecto hace menos de media hora");
    //                     }
    //                 }
    //             });
    //             return res.status(200).send({ status: "succes" });

    //     } catch (error) {
    //         console.error("Error en deleteUserTimeOut:", error);
    //         return res.status(500).send({ status: "error", message: "Error interno del servidor" });
    //     }
    // }


    static updateUser = async (req, res) => {
        const uid = req.params.uid;
        const  {
            first_name,
            last_name,
            email,
            age,
            role
        } = req.body;
        //Para cambiar el passWord existe un endPoint completo que etá sessions
        if (!first_name || !last_name || !email) {
            return res.status(401).send({error:"Falta datos del Usuario, nombres o eMail"});
        }
        const user = {
            first_name,
            last_name,
            email,
            age,
            role
        }
        // const user = await userDao.createUser(user);
        const result = await userService.updateUser(uid, user);
        
        return res.status(200).send({status:"succes", result} );
    }

    static cargarDocuments = async (req, res) => {
        const uid = req.params.uid;
        const filename = req.file.filename;
        //console.log("Entre a user.controller.js. cargarDocuments")
        if(!filename){
            return res.status(400).send({
                status:"error",
                error:"No se pudo cargar la imagen"
            })
        }  
        const file = {
            name: filename,
            reference: `http://localhost:8080/images/documents/${filename}`
        }

        const user = await userService.getIdUser(uid)
        user.documents.push(file);
        const result = await userService.updateUser(uid, user);
        return res.status(200).send({status:"succes", result });
    }

    static profileImagen = async (req, res) => {
        const uid = req.params.uid;
        const filename = req.file.filename;
        //console.log("Entre a user.controller.js. cargarDocuments")
        if(!filename){
            return res.status(400).send({
                status:"error",
                error:"No se pudo cargar la imagen"
            })
        }  

        const user = await userService.getIdUser(uid)
        user.profileImage = `/images/profile/${filename}`;
        const result = await userService.updateUser(uid, user);
        return res.status(200).send({status:"succes", result });
    }

    static changeRole = async (req, res) => {
        // const user = await userDao.createUser(user);
        
        const uid = req.params.uid;
        const user = await userService.getIdUser(uid);
        //Logica para cambiar de Role
        if (user.role !== "ADMIN") {
            switch(user.role) {
                case "USER":
                    if (user.documents.length >= 3) {
                        user.role = "PREMIUM"
                    } else {
                        //console.log("El usuario no ha cargado los 3 documentos obligatorios de Identificacion")
                        return res.status(400).send({status:"error", message:"El usuario no ha cargado los 3 documentos obligatorios de Identificacion" });
                    }

                    break;
                case "PREMIUM":
                    user.role = "USER"
                    break;
                default:
                    user.role = "USER";
                    break;
            }
        }else {
            return res.status(400).send({status:"error", message:"No se puede cambiar de rol al Administrador" });
        }
        if (req) {
            req.user.role = user.role;  //Cambia en tiempo real el Rol del Usuario
        }
        
        const result = await userService.updateUser(uid, user);
        
        return res.status(200).send({status:"succes", result });
    }
}

export {UserController};