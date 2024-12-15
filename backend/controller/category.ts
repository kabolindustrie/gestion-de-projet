import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllCategoriesRepo,
    findCategoryByIdRepo,
    deleteCategoryByIdRepo,
    addCategory,
    updateCategory,
    findCategoryByName,
} from "../repositories/category";


/////
// Récupérer toutes les catégories
/////
export const getAllCategories = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const categories = await getAllCategoriesRepo();
        reply.send(categories);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching categories",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/////
// Récupérer une catégorie par ID
/////
export const getCategoryById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        if (isNaN(categoryId)) {
            return reply.code(400).send({ message: "Invalid category ID" });
        }

        const category = await findCategoryByIdRepo(categoryId);
        if (!category) {
            return reply.code(404).send({ message: "Category not found" });
        }

        reply.send(category);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching category",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/////
// Supprimer une catégorie par ID
/////
export const deleteCategoryById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        if (isNaN(categoryId)) {
            return reply.code(400).send({ message: "Invalid category ID" });
        }

        const deletedCategory = await deleteCategoryByIdRepo(categoryId);
        if (!deletedCategory) {
            return reply.code(404).send({ message: "Category not found or already deleted" });
        }

        reply.send({ message: `Category with id "${deletedCategory.id}" has been deleted` });
    } catch (error) {
        reply.code(500).send({
            message: "Error deleting category",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/////
// Créer une catégorie
/////
export const createCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name } = request.body as { name: string };

        const existingCategory = await findCategoryByName(name);
        if (existingCategory) {
            return reply.code(400).send({ message: "Category already exists" });
        }

        const category = await addCategory(name);
        reply.code(201).send(category);
    } catch (error) {
        reply.code(500).send({
            message: "Error creating category",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
;

/////
// Modifier une catégorie
/////
export const updateCategoryById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const { name } = request.body as { name: string };

        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            return reply.code(400).send({ message: "Invalid category ID" });
        }

        const existingCategory = await findCategoryByName(name);
        if (existingCategory && existingCategory.id !== categoryId) {
            return reply.code(400).send({ message: "Category with this name already exists" });
        }

        const updatedCategory = await updateCategory(categoryId, name);

        if (!updatedCategory) {
            return reply.code(404).send({ message: "Category not found" });
        }

        reply.send(updatedCategory);
    } catch (error) {
        reply.code(500).send({
            message: "Error updating category",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
