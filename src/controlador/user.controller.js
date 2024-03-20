 import { userDao } from "../dao/index.js";
import { userService } from "../dao/repository/index.js";

class UserController {
    static getUsers = async (req, res) => {
        try {
            //userDao.getUsers
            //const users = await userDao.getUsers();
            const users = await userService.getUsers();
            console.log("Users: ", users)
            return res.status(200).send({status:"succes", users});
        } catch (error) {
            throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
        }
    }

    static getIdUser = async (req, res) => {
        const uid = req.params.uid;
        //console.log("En controllers user, uid:", uid)
        // const user = await userDao.getIdUser(idUser);
        const user = await userService.getIdUser(uid);
        return res.status(200).send({status:"succes", user });

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
            age,
            role
        } = req.body;
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
        const result = await userService.createUser(user);
        
        return res.status(200).send({status:"succes", result });
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

    static changeRole = async (req, res) => {
        // const user = await userDao.createUser(user);

        const uid = req.params.uid;
        const user = await userService.getIdUser(uid);
        //Logica para cambiar de Role
        if (user.role !== "ADMIN") {
            switch(user.role) {
                case "USER":
                    user.role = "PREMIUM"
                    break;
                case "PREMIUM":
                    user.role = "USER"
                    break;
                default:
                    user.role = "USER";
                    break;
            }
        }
        req.user.role = user.role;
        const result = await userService.updateUser(uid, user);
        
        return res.status(200).send({status:"succes", result });
    }
}

export {UserController};