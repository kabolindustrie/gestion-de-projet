
import { ProjectCategory } from './project.models'; // Import de l'interface ProjectCategory

export interface Category {
  id: number;
  name: string;  // Nom de la catégorie
  projects?: ProjectCategory[];  // Relation avec les projets associés
}
