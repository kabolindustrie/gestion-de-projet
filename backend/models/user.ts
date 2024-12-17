import { UserProject } from './project';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    projects?: UserProject[];
}



export interface UserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    projects?: UserProject[];
}
