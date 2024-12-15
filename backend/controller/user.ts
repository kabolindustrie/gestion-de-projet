import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllUsersRepo,
    findUserByIdRepo,
    deleteUserByIdRepo,
    addUser,
    updateUser,
} from "../repositories/user";

////
// Récupérer tous les utilisateurs
////
export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await getAllUsersRepo();
        reply.send(users);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching users",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

////
// Récupérer un utilisateur par ID
////
export const findUserById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return reply.code(400).send({ message: "Invalid user ID" });
        }

        const user = await findUserByIdRepo(userId);
        if (!user) {
            return reply.code(404).send({ message: "User not found" });
        }

        reply.send(user);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

////
// Supprimer un utilisateur par ID
////
export const deleteUserById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return reply.code(400).send({ message: "Invalid user ID" });
        }

        const deletedUser = await deleteUserByIdRepo(userId);
        if (!deletedUser) {
            return reply.code(404).send({ message: "User not found or already deleted" });
        }

        reply.send({ message: `User with id "${deletedUser.id}" has been deleted` });
    } catch (error) {
        reply.code(500).send({
            message: "Error deleting user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

////
// Création d'un user
////
export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { lastName, firstName, role, email, password } = request.body as {
            lastName: string;
            firstName: string;
            role: string;
            email: string;
            password: string;
        };

        const user = await addUser(lastName, firstName, role, email, password);

        reply.code(201).send(user);
    } catch (error) {
        if ((error as any).code === "P2002") {
            reply.code(400).send({ message: "Email already in use" });
        } else {
            reply.code(500).send({
                message: "Error creating user",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
};

/////
// Modifier un utilisateur
////
export const updateUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const { lastName, firstName, role, email, password } = request.body as {
            lastName: string;
            firstName: string;
            role: string;
            email: string;
            password: string;
        };

        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return reply.code(400).send({ message: "Invalid user ID" });
        }

        const user = await updateUser(userId, lastName, firstName, role, email, password);

        if (!user) {
            reply.code(404).send({ message: 'User not found' });
        } else {
            reply.send(user);
        }
    } catch (error) {
        reply.code(500).send({
            message: "Error updating user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
