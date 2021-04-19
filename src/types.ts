export interface User {
    id: number;
    userName:string;
}

export interface Users {
    [key: string]: User;
}