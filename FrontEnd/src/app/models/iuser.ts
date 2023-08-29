export interface IUser {
    //DATA FOR USER
    id: string,
    name: string,
    password: string,
    email: string,
    gender: string,
}

export interface IUserWithToken extends IUser{
    token:string,
}

