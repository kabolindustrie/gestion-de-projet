import { FastifyInstance } from 'fastify';
import {
    getAllCategories,
    getCategoryById,
    deleteCategoryById,
    updateCategoryById,
    createCategory,
} from '../controller/category';

async function categoryRoutes(fastify: FastifyInstance) {

    fastify.get('/', getAllCategories);
    fastify.get('/:id', getCategoryById);
    fastify.delete('/:id', deleteCategoryById);
    fastify.put(
        '/:id',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', minLength: 2 },
                    },
                    additionalProperties: false,
                }
            },
        }, updateCategoryById);
    fastify.post(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', minLength: 2 },
                    },
                    required: ['name'],
                    additionalProperties: false,
                }
            },
        }, createCategory);
}

export default categoryRoutes;
