export interface IUser {
    id: string,
    name: string,
    password: string,
    age : number,
    email: string,
    phone : string,
    address : string,
    registered : Date
    scopes: string[],
    subscription : string | undefined,
    gender: string,
    token: string | undefined,
}

