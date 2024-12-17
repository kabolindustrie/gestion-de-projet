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
                    isFinished: faker.datatype.boolean(),
                },
            })
        )
    );

    // Création des relations entre utilisateurs et projets
    const userProjects = await Promise.all(
        projects.map(async (project) => {
            const assignedUsers = new Set<number>();

            while (assignedUsers.size < 3) {
                const randomUser = faker.helpers.arrayElement(users);
                if (!assignedUsers.has(randomUser.id)) {
                    assignedUsers.add(randomUser.id);
                    await prisma.userProject.create({
                        data: {
                            userId: randomUser.id,
                            projectId: project.id,
                        },
                    });
                }
            }
        })
    );

    const projectCategories = await Promise.all(
        projects.map(async (project) => {
            const assignedCategories = new Set<number>();
            const numberOfCategories = Math.floor(Math.random() * 5) + 1;


            const categoriesToAssign = Array.from({ length: numberOfCategories }, () => {
                let randomCategory = faker.helpers.arrayElement(categories);


                while (assignedCategories.has(randomCategory.id)) {
                    randomCategory = faker.helpers.arrayElement(categories);
                }

                assignedCategories.add(randomCategory.id);

                return prisma.projectCategory.create({
                    data: {
                        projectId: project.id,
                        categoryId: randomCategory.id,
                    },
                });
            });

            return Promise.all(categoriesToAssign);
        })
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
