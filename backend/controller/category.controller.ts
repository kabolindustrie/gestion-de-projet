import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllCategoriesRepo,
    findCategoryByIdRepo,
    deleteCategoryByIdRepo,
    addCategory,
    updateCategory,
} from "../repositories/category.repositories";

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
export const createCategory = async (categoryData: any, reply: FastifyReply) => {
    try {
        const newCategory = await addCategory(
            categoryData.name,
        );

        reply.code(201).send(newCategory);
    } catch (error) {
        if ((error as any).code === "P2002") {
            reply.code(400).send({ message: "Category name already in use" });
        } else {
            reply.code(500).send({
                message: "Error creating category",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
};

/////
// Modifier une catégorie
/////
export const updateCategoryById = async (
    categoryId: number,
    updateData: any,
    reply: FastifyReply
) => {
    try {
        const updatedCategory = await updateCategory(
            categoryId,
            updateData.name,
        );

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
