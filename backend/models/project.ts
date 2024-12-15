import { User } from './user';
import { Category } from './category';

export interface Project {
    id: number;
    name: string;
    description?: string | null;
    isFinished: boolean;
    users?: UserProject[];
    categories?: ProjectCategory[];
}

export interface ProjectCategory {
    id: number;
    category?: Category;
    project?: Project;
}


export interface UserProject {
    id: number;
    user?: User;
    project?: Project;
}
