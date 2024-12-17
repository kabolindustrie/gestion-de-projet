export interface Category {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  isFinished: boolean;
  categories: Category[];
}
