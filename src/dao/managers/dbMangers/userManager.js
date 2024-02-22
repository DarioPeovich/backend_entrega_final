import userModel from "../../models/users.model.js";

class UserManagerDB {
    getUsers = async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            console.log("Error fetching carts:", error)
        }
    }

    getIdUser = async (idUser) => {
        try {
            const user = await userModel.findOne({ _id: idUser});
            if (!user) {
                throw new Error(`No se encontró ningún usuario con el ID: ${idUser}`);  //se lanza una excepcion, para capturarla desde el Route
            }
            return user;
        } catch (error) {
            throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
        }
    }

    getEmailUser = async (email) => {
        try {
            const user = await userModel.findOne({email:email})
            return user
        } catch (error) {
            throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
        }
    }

    createUser = async (user) => {
        try {
            const result = userModel.create(user);
            return result
        } catch (error) {
            console.log("Error en lectura de archivos!!");
            throw error;
        }
    }
}

export {UserManagerDB};