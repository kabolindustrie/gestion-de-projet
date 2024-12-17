import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export interface Category {
  id: number;
  name: string;
}

const fetchCategories = async () => await api.get<Category[]>("/categories");

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

