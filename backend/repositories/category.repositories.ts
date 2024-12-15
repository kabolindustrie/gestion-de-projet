import prisma from "../prisma/client";
import { Category } from "../models/category.models";

/////
// Trouver toutes les catégories
/////
export const getAllCategoriesRepo = async (): Promise<Category[]> => {
    return prisma.category.findMany();
};

/////
// Trouver une catégorie par ID
/////
export const findCategoryByIdRepo = async (id: number): Promise<Category | null> => {
    return prisma.category.findUnique({
        where: { id },
    });
};

/////
// Supprimer une catégorie par ID
/////
export const deleteCategoryByIdRepo = async (id: number): Promise<Category | null> => {
    return prisma.category.delete({
        where: { id },
    });
};

//////
// Modifie une catégorie
//////
export const updateCategory = async (id: number, name: string): Promise<Category | null> => {
    return await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        },
    });
};


/////
// Ajouter une catégorie
/////
export const addCategory = async (name: string): Promise<Category> => {
    return await prisma.category.create({
        data: {
            name: name,
        },
    });
};
