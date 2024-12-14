import { FastifyInstance } from 'fastify';
import {
  getAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
  createUser,
} from '../controller/user.controller';

async function userRoutes(fastify: FastifyInstance) {
  // Schéma pour créer un utilisateur
  const createUserSchema = {
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
  } as const;

  // Schéma pour mettre à jour un utilisateur
  const updateUserSchema = {
    type: 'object',
    properties: {
      firstName: { type: 'string', minLength: 2 },
      lastName: { type: 'string', minLength: 2 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      role: { type: 'string', enum: ['admin', 'user'] },
    },
    additionalProperties: false,
  } as const;

  // Route pour récupérer tous les utilisateurs
  fastify.get('/', getAllUsers);

  // Route pour récupérer un utilisateur par ID
  fastify.get('/:id', findUserById);

  // Route pour supprimer un utilisateur par ID
  fastify.delete('/:id', deleteUserById);

  // Route pour modifier un utilisateur
  fastify.put<{ Params: { id: string }; Body: typeof updateUserSchema }>(
    '/:id',
    {
      schema: {
        body: updateUserSchema, // Validation avec le schéma JSON
      },
    },
    async (req, reply) => {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return reply.code(400).send({ message: 'Invalid user ID' });
      }

      // Passe les données de la requête au contrôleur
      return updateUserById(userId, req.body, reply);
    }
  );

  // Route pour créer un utilisateur
  fastify.post<{ Body: typeof createUserSchema }>(
    '/add',
    {
      schema: {
        body: createUserSchema, // Validation avec le schéma JSON
      },
    },
    async (req, reply) => {
      return createUser(req.body, reply);
    }
  );
}

export default userRoutes;
