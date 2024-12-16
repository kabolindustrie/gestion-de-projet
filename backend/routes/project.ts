import { FastifyInstance } from 'fastify';
import { getAllProject, getProjectById, deleteProjectById, addProject, updateProject } from '../controller/project';

async function projectRoutes(fastify: FastifyInstance) {

    fastify.get('/', getAllProject);
    fastify.get('/:id', getProjectById);
    fastify.delete('/:id', deleteProjectById);
    fastify.post(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', minLength: 2 },
                        description: { type: 'string' },
                        isFinished: { type: 'boolean' },
                        userIds: {
                            type: 'array',
                            items: { type: 'number' },
                        },
                        categoryIds: {
                            type: 'array',
                            items: { type: 'number' },
                        },
                    },
                    required: ['name', 'isFinished', 'userIds', 'categoryIds'],
                    additionalProperties: false,
                }
            },
        }, addProject);

    fastify.put(
        '/:id',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', minLength: 2 },
                        description: { type: 'string' },
                        isFinished: { type: 'boolean' },
                        userIds: {
                            type: 'array',
                            items: { type: 'number' },
                        },
                        categoryIds: {
                            type: 'array',
                            items: { type: 'number' },
                        },
                    },
                    required: ['name', 'isFinished', 'userIds', 'categoryIds'],
                    additionalProperties: false,
                }
            },
        }, updateProject);
}

export default projectRoutes;
