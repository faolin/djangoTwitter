/**
 * @description modéle d'informations à propos d'un utilisateur
 */
export class User {

    state: Boolean;

    role: String;
    email: String;

    firstName: String;
    lastName: String;
    thumbnail: String;

    phone: String;
    username: String;
    password: String;

    address1: String;
    address2: String;
    postalCode: number;

    comments: String;
    roles: String[];

    company: String;
    title: String;

    constructor() {
    }

}
