// project.models.ts

import { User } from './user.models'; // Import de l'interface User
import { Category } from './category.models'; // Import de l'interface Category

export interface Project {
  id: number;
  name: string;  // Nom du projet
  description?: string | null;  // Description du projet (optionnelle)
  createdAt: Date;  // Date de création
  updatedAt: Date;  // Date de dernière mise à jour
  userId: number;  // Clé étrangère vers l'utilisateur
  user?: User;  // L'utilisateur associé au projet
  categories?: ProjectCategory[];  // Catégories associées au projet
}

// Interface pour gérer la relation entre Project et Category
export interface ProjectCategory {
  id: number;
  projectId: number;
  categoryId: number;
  category?: Category;  // Lien avec Category
  project?: Project;    // Lien avec Project
}
