import { GetsContactDto} from "../dto/users.dto.js";

export class UserRepository {
    constructor (dao) {
        this.dao = dao;

    }

      getUsers = async () => {
        const users = await this.dao.getUsers();
        usersDto = users.map( (user) => {
         const usersDto = new GetsContactDto(user);
         return usersDto;
        })
     }

     getIdUser = async (id) => {
        const user = await this.dao.getIdUser(id);
        const userDto = new GetsContactDto(user);
        return userDto;
     }

     getEmailUser  = async (email) => {
      const user = await this.dao.getEmailUser(email);
      const userDto = new GetsContactDto(user);
      return userDto;
     }
     
}