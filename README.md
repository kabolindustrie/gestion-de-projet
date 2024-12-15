# gestion-de-projet
une application web de gestion de projets qui permet aux utilisateurs de gérer des projets.


# Lancement du backend
```sh
# à la racine du projet
docker compose up --build -d
cd backend
npx prisma migrate dev
docker exec -it gestion_backend sh
npx prisma db seed
```

# Lancement du frontend

# AXE D'AMÉLIORATION

Dans la consigne il était noté qu'il y avait une raltion many to many entre Project et Catégorie. Il n'était pas préciser qu'il y avait une relation many to many entre Project et User. Cependant j'ai pris la liberté de faire cette relation qui me semblait pertinente. 
