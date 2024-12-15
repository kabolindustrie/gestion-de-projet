
import { ProjectCategory } from './project.models'; // Import de l'interface ProjectCategory

export interface Category {
  id: number;
  name: string; 
  projects?: ProjectCategory[];
}
