import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

interface Project {
  id: number;
  name: string;
  description?: string;
  isFinished: boolean;
}

const fetchProjects = async () => await api.get<Project[]>("/projects");

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
