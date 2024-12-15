import { FastifyInstance } from 'fastify';
import { getAllProject, getProjectById, deleteProjectById, addProject } from '../controller/project'

async function projectRoutes(fastify: FastifyInstance) {

    fastify.get('/', getAllProject);
    fastify.get('/:id', getProjectById);
    fastify.delete('/:id', deleteProjectById);
    fastify.post('/', addProject);
}

export default projectRoutes;
