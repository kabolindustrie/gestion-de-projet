import prisma from "../prisma/client";
import { faker } from '@faker-js/faker';

async function main() {
    // Génération des catégories
    const categories = await Promise.all(
        Array.from({ length: 10 }, () =>
            prisma.category.create({
                data: {
                    name: `${faker.commerce.department()}-${Math.floor(Math.random() * 1000)}`,
                },
            })
        )
    );

    // Génération des utilisateurs
    const users = await Promise.all(
        Array.from({ length: 10 }, () =>
            prisma.user.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: faker.helpers.arrayElement(['vendeur', 'acheteur']),
                },
            })
        )
    );

    // Génération des projets
    const projects = await Promise.all(
        Array.from({ length: 10 }, () =>
            prisma.project.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.lorem.sentence(),
                    userId: faker.helpers.arrayElement(users).id,
                },
            })
        )
    );

    // Création des relations entre projets et catégories
    const projectCategories = await Promise.all(
        projects.flatMap((project) =>
            categories.map((category) =>
                prisma.projectCategory.create({
                    data: {
                        projectId: project.id,
                        categoryId: category.id,
                    },
                })
            )
        )
    );

    console.log('Base de données peuplée avec succès !');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
