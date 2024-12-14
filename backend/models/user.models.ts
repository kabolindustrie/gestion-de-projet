// user.models.ts

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string; // "user" ou "admin"
  projects?: Project[]; // Projets associés
}

// Importer l'interface Project dans ce fichier pour l'utiliser ici
import { Project } from './project.models'; // Assurez-vous d'importer le bon fichier

