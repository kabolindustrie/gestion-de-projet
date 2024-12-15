import prisma from "../prisma/client";
import { Project } from "../models/project";


/////
// Trouver tous les utilisateurs
/////
export const getAllProjectRepo = async (): Promise<Project[]> => {
    const projects = await prisma.project.findMany({
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
            users: {
                include: {
                    user: true,
                },
            },
        },
    });


    return projects.map(project => ({
        id: project.id,
        description: project.description,
        name: project.name,
        isFinished: project.isFinished,
        categories: project.categories.map(pc => ({
            id: pc.category.id,
            name: pc.category.name,
        })),
        users: project.users.map(up => ({
            id: up.user.id,
            firstName: up.user.firstName,
            lastName: up.user.lastName,
            email: up.user.email,
            role: up.user.role,
        })),
    }));
};

/////
// Trouver un utilisateur par ID
/////
export const getProjectByIdRepo = async (id: number): Promise<Project | null> => {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
            users: {
                include: {
                    user: true,
                },
            },
        },
    });
    if (project) {
        return {
            id: project.id,
            description: project.description,
            name: project.name,
            isFinished: project.isFinished,
            categories: project.categories.map(pc => ({
                id: pc.category.id,
                name: pc.category.name,
            })),
            users: project.users.map(up => ({
                id: up.user.id,
                firstName: up.user.firstName,
                lastName: up.user.lastName,
                email: up.user.email,
                role: up.user.role,
            })),
        };
    }
    return null;
};


/////
// Supprimer un utilisateur
/////
export const deleteProjectByIdRepo = async (id: number): Promise<Project | null> => {
    return prisma.project.delete({
        where: { id },
    });
};

//////
// Ajouter un projet avec ses utilisateurs et catégories
///
export const addProjectRepo = async (
    name: string,
    description: string | null,
    isFinished: boolean,
    userIds: number[],
    categoryIds: number[]
) => {
    const project = await prisma.project.create({
        data: {
            name,
            description,
            isFinished,
            users: {
                connect: userIds.map((userId) => ({ id: userId })),
            },
            categories: {
                connect: categoryIds.map((categoryId) => ({ id: categoryId })),
            },
        },
        include: {
            users: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                        },
                    },
                },
            },
            categories: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return project;
};
