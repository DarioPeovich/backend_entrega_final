export class GetsContactDto{
    constructor(contact){
        this.fullName = `${contact.firts_name} ${contact.last_name}`;
        this.name = contact.firts_name;
        this.lastName = contact.last_name;
        this.telefono = contact.telefono;
        this.email = contact.email;
        // this.password = contact.password;
    }
}