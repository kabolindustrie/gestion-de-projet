import prisma from "../prisma/client";
import { User, UserWithoutPassword } from "../models/user";
import { hashPassword } from "../utils/password.utils";

/////
// Trouver tous les utilisateurs
/////
export const getAllUsersRepo = async (): Promise<UserWithoutPassword[]> => {
    return prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            projects: true,
        },
    });
};

/////
// Trouver un utilisateur par ID
/////
export const findUserByIdRepo = async (id: number): Promise<UserWithoutPassword | null> => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            projects: true,
        },
    });
};

/////
// Supprimer un utilisateur
/////
export const deleteUserByIdRepo = async (id: number): Promise<User | null> => {
    return prisma.user.delete({
        where: { id },
    });
};

/////
// Ajouter un utilisateur
/////
export const addUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string = "user"
): Promise<User> => {
    const hashedPassword = hashPassword(password);

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        },
    });
    return user;
};

/////
// Modifier un utilisateur
/////
export const updateUser = async (
    id: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    role?: string
): Promise<User | null> => {
    const dataToUpdate: any = {};

    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (email) dataToUpdate.email = email;
    if (password) dataToUpdate.password = hashPassword(password);
    if (role) dataToUpdate.role = role;

    return prisma.user.update({
        where: { id },
        data: dataToUpdate,
    });
};
