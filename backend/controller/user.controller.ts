import { FastifyReply, FastifyRequest } from "fastify";
import {
  getAllUsersRepo,
  findUserByIdRepo,
  deleteUserByIdRepo,
  addUser,
  updateUser,
} from "../repositories/user.repositories";

// Récupérer tous les utilisateurs
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

// Récupérer un utilisateur par ID
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

// Supprimer un utilisateur par ID
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

// Créer un utilisateur
export const createUser = async (userData: any, reply: FastifyReply) => {
  try {
    const newUser = await addUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.role
    );

    reply.code(201).send(newUser);
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

// Modifier un utilisateur
export const updateUserById = async (
  userId: number,
  updateData: any,
  reply: FastifyReply
) => {
  try {
    const updatedUser = await updateUser(
      userId,
      updateData.firstName,
      updateData.lastName,
      updateData.email,
      updateData.password,
      updateData.role
    );

    if (!updatedUser) {
      return reply.code(404).send({ message: "User not found" });
    }

    reply.send(updatedUser);
  } catch (error) {
    reply.code(500).send({
      message: "Error updating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
