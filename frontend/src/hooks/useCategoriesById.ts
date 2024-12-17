import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export interface Category {
  id: number;
  name: string;
}

const fetchCategoryById = async (categoryId: number) => await api.get<Category>(`/categories/${categoryId}`);

export const useCategory = (categoryId: number) =>
  useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryById(categoryId),
  });
