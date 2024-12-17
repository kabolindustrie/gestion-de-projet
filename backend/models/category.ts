
import { ProjectCategory } from './project';

export interface Category {
  id: number;
  name: string;
  projects?: ProjectCategory[];
}
