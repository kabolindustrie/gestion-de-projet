import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllProjectRepo,
    getProjectByIdRepo,
    deleteProjectByIdRepo,
    addProjectRepo,
} from "../repositories/project";


/////
// Récupérer toutes les projets
/////
export const getAllProject = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const projects = await getAllProjectRepo();
        if (!projects || projects.length === 0) {
            return reply.code(404).send({ message: "No projects found" });
        }

        reply.send(projects);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching projects",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/////
// Récupérer un projet par ID
/////
export const getProjectById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
            return reply.code(400).send({ message: "Invalid project ID" });
        }

        const project = await getProjectByIdRepo(projectId);
        if (!project) {
            return reply.code(404).send({ message: "Project not found" });
        }

        reply.send(project);
    } catch (error) {
        reply.code(500).send({
            message: "Error fetching project",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};


/////
// Supprimer un projet par ID
/////
export const deleteProjectById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
            return reply.code(400).send({ message: "Invalid project ID" });
        }

        const deletedProject = await deleteProjectByIdRepo(projectId);
        if (!deletedProject) {
            return reply.code(404).send({ message: "Project not found or already deleted" });
        }

        reply.send({ message: `Project with id "${deletedProject.id}" has been deleted` });
    } catch (error) {
        reply.code(500).send({
            message: "Error deleting project",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};



export const addProject = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, description, isFinished, userIds, categoryIds } = req.body as {
            name: string;
            description: string | null;
            isFinished: boolean;
            userIds: number[];
            categoryIds: number[];
        };

        const missingFields: string[] = [];
        if (!name) missingFields.push("name");
        if (isFinished === undefined) missingFields.push("isFinished");
        if (!userIds || userIds.length === 0) missingFields.push("userIds");
        if (!categoryIds || categoryIds.length === 0) missingFields.push("categoryIds");


        if (missingFields.length > 0) {
            return reply.code(400).send({
                message: "Missing required fields",
                missingFields: missingFields,
            });
        }

        const newProject = await addProjectRepo(name, description, isFinished, userIds, categoryIds);

        // Structure de réponse adaptée
        reply.code(201).send({
            id: newProject.id,
            name: newProject.name,
            description: newProject.description,
            isFinished: newProject.isFinished,
            users: newProject.users.map((userProject) => userProject.user),
            categories: newProject.categories.map((projectCategory) => projectCategory.category),
        });
    } catch (error) {
        reply.code(500).send({
            message: "Error adding project",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
