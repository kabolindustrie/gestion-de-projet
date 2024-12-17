# gestion-de-projet

## Objectif

Ce projet a pour objectif de développer une application web de gestion de projets permettant aux utilisateurs de créer, modifier et organiser des projets. Chaque projet peut être associé à une ou plusieurs catégories.

Les fonctionnalités principales sont les suivantes :

**Gestion des catégories :** Créer, lire, mettre à jour et supprimer des catégories (CRUD).
**Gestion des projets :** Créer, lire, mettre à jour et supprimer des projets (CRUD).
**Filtrage des projets :** Filtrer les projets par catégorie.
une application web de gestion de projets qui permet aux utilisateurs de gérer des projets.

### Déploiement et Lancement

## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

 - Docker
 - Node.js (version 16.x ou supérieure)

# Lancement du backend

Pour démarrer l'environnement de développement avec Docker, exécutez la commande suivante
```sh
docker compose up --build -d
```

Configurez la base de données en appliquant les migrations Prisma et insérez les données initiales dans la base de données avec le script de seed.

```sh
cd backend
npx prisma migrate dev
docker exec -it gestion_backend sh
npx prisma db seed
```

# Lancement du frontend

 Installez les dépendances nécessaires pour le frontend et démarrer le serveur de développement en local, utilisez la commande suivante :

```sh
cd ../frontend
npm install
npm run dev
```

### Conception


## Modèle Physique de Données (MPD)
Un Modèle Physique de Données (MPD) a été conçu pour garantir une base de données structurée et adaptée aux besoins de l'application.
Ce modèle représente les tables de la base de données et leurs relations. Il a été élaboré avec Prisma comme ORM pour faciliter l'interaction avec la base de données.

<img src="/frontend/public/assets/images/mpd_gestion_de_projet.png" width="400" height="400" />


### Diagramme de Séquence
Le Diagramme de Séquence UML illustre les interactions principales entre les entités du système, en particulier les échanges entre l'utilisateur et l'application pour la gestion des projets et des catégories.

<img src="/frontend/public/assets/images/diagramme_sequence-gestion_de_projet.png" width="400" height="400" />


### Décisions de Conception


## Utilisation de Docker
Docker a été utilisé pour garantir un environnement uniforme, quelle que soit la machine ou le système d'exploitation. Cela simplifie le déploiement, la configuration et l'exécution de l'application, ainsi que la gestion de la base de données.

## Relation entre Projet et Catégorie
Une relation many-to-many a été implémentée entre les entités Project et Category. Cette approche permet à un projet d’être associé à plusieurs catégories et vice versa, répondant ainsi à l'exigence de filtrage des projets par catégorie.

## Extension avec une Table User
Bien qu'une gestion des utilisateurs n'ait pas été explicitement demandée, une table User a été ajoutée. Cette table permet de lier plusieurs utilisateurs à un projet via une relation many-to-many, anticipant ainsi des besoins futurs d'attribution de projets à des équipes ou des utilisateurs multiples.

## Utilisation de Prisma
Prisma est utilisé comme ORM pour interagir avec la base de données. Il permet de gérer la création et la mise à jour des tables via des migrations, ainsi que l'insertion et la récupération des données de manière sécurisée et efficace.

## Utilisation de react-hook-form
react-hook-form a été utilisé pour la gestion des formulaires dans l'application frontend. Cette bibliothèque offre une gestion optimisée des formulaires, améliore les performances de l'application et simplifie la validation des données saisies.

## Utilisation de TanStack Query
TanStack Query (anciennement React Query) est utilisé pour la gestion des requêtes asynchrones côté frontend. Il permet de récupérer, mettre en cache et synchroniser les données provenant de l'API backend de manière efficace et réactive, améliorant ainsi l'expérience utilisateur.

# AXE D'AMÉLIORATION

Dans la consigne il était noté qu'il y avait une raltion many to many entre Project et Catégorie. Il n'était pas préciser qu'il y avait une relation many to many entre Project et User. Cependant j'ai pris la liberté de faire cette relation qui me semblait pertinente.

**Authentification** : L'authentification n'a pas encore été mise en place, mais la base de données est conçue pour accueillir facilement cette fonctionnalité via la table User.

**Tests unitaires**: Aucun test unitaire n'a été intégré pour le moment. L'ajout de tests automatisés, notamment avec Jest, est prévu pour garantir la stabilité de l'application à long terme.

**Composants réutilisables** : L'utilisation de la bibliothèque shadcn pourrait être envisagée pour créer des composants plus robustes, accessibles, réutilisables et maintenables, permettant ainsi de simplifier le travail des développeurs sur le projet.
