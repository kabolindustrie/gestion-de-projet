import { FastifyInstance } from 'fastify';
import {
    getAllUsers,
    findUserById,
    deleteUserById,
    updateUserById,
    createUser,
} from '../controller/user';

async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', getAllUsers);
    fastify.get('/:id', findUserById);
    fastify.delete('/:id', deleteUserById);
    fastify.put(
        '/:id',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string', minLength: 2 },
                        lastName: { type: 'string', minLength: 2 },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 8 },
                        role: { type: 'string', enum: ['admin', 'user'] },
                    },
                    additionalProperties: false,
                }
            },
        }, updateUserById);
    fastify.post(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string', minLength: 2 },
                        lastName: { type: 'string', minLength: 2 },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 8 },
                        role: { type: 'string', enum: ['admin', 'user'] },
                    },
                    required: ['firstName', 'lastName', 'email', 'password', 'role'],
                    additionalProperties: false,
                }
            },
        }, createUser);
}

export default userRoutes;
