export interface IUser {
    //DATA FOR USER
    id: string,
    name: string,
    password: string,
    email: string,
    roles:string[], //ESTO PUEDE SER UN ARREGLO O SCOPES
    gender: string,
    token: string | null,
}
