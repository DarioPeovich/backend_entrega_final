export class GetsUserDto{
    constructor(user){
        this._id = user._id;
        this.fullName = `${user.first_name} ${user.last_name}`;
        this.name = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.role = user.role;
        this.documents = user.documents;
        this.last_connection = user.last_connection;
        // this.password = contact.password;
    }
}