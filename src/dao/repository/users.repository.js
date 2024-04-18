import { GetsUserDto} from "../dto/users.dto.js";

export class UserRepository {
    constructor (dao) {
        this.dao = dao;

    }

      getUsers = async () => {
        const users = await this.dao.getUsers();
        //return users;
        const usersDto = users.map( (user) => {
         const userDto = new GetsUserDto(user);
         return userDto; }
         )
         return usersDto;
     }

     getIdUser = async (id) => {
        const user = await this.dao.getIdUser(id);
        const userDto = new GetsUserDto(user);
        return userDto;
     }

     getEmailUser  = async (email) => {
      //console.log("En UserRepository", "email", email)
      const user = await this.dao.getEmailUser(email);
      const userDto = new GetsUserDto(user);
      return userDto;
     }
     
     updateUser = async (uid, user) => {
      const updateUser = await this.dao.updateUser(uid, user);
      return updateUser;
     }

     createUser = async (user) => {
      const createdUser = await this.dao.createUser(user);
      return createdUser;
     }

     deleteUser = async (uid) => {
      //console.log("En repository,js uid: ", uid)
      const result = await this.dao.deleteUser(uid);
      return result;
     }

}