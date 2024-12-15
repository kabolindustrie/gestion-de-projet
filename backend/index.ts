import Fastify from 'fastify';
import userRoutes from './routes/user';
import categoryRoutes from './routes/category';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/project';

// Charger les variables d'environnement
dotenv.config();

// Créer une instance Fastify
const fastify = Fastify({
    logger: true
});

// Configuration CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Enregistrer le plugin CORS
fastify.register(fastifyCors, corsOptions);

// Route de test
fastify.get('/', async (request, reply) => {
    return { message: 'API is running' };
});

// Routes
fastify.register(async (api) => {
  api.register(userRoutes, { prefix: '/users' });
  api.register(categoryRoutes, { prefix: '/categories' });
  api.register(projectRoutes, { prefix: '/projects' });
}, { prefix: '/api' });

// Démarrer le serveur
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running on http://localhost:3000');
});
