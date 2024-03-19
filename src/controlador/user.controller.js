// import { userDao } from "../dao/index.js";
import { userService } from "../dao/repository/index.js";

class UserController {
    static getUsers = async () => {
        try {
            //userDao.getUsers
            //const users = await userDao.getUsers();
            const users = await userService.getUsers();
            return users;
        } catch (error) {
            throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
        }
    }

    static getIdUser = async (idUser) => {
        // const user = await userDao.getIdUser(idUser);
        const user = await userService.getIdUser(idUser);
        return user;

    }

    static getEmailUser = async (email) => {
        // const user = await userDao.getEmailUser(email);
        const user = await userService.getEmailUser(email);
        console.log("En userController", "user:", user)
        return user;
    }

    static createUser = async (user) => {
        // const user = await userDao.createUser(user);
        const result = await userService.createUser(user);
        
        return result;
    }

    static changeRole = async (user) => {
        // const user = await userDao.createUser(user);
        const uid = req.params.uid;
        const result = await userService.createUser(user);
        
        return result;
    }
}

export {UserController};