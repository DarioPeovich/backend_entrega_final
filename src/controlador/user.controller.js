import { userDao } from "../dao/index.js";
import { userService } from "../dao/repository/index.js";

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
        const email = req.query.email; // Obtener el parámetro de consulta email
        const user = await userService.getEmailUser(email);
        return res.status(200).send({status:"succes", user} );
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
        }
        if (req) {
            req.user.role = user.role;  //Cambia en tiempo real el Rol del Usuario
        }
        
        const result = await userService.updateUser(uid, user);
        
        return res.status(200).send({status:"succes", result });
    }
}

export {UserController};