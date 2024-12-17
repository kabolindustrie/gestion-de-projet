import { useQuery } from "@tanstack/react-query";
import { Project } from "../type";
import api from "../utils/api";

const fetchProjects = async (): Promise<Project[]> =>
  await api.get<Project[]>("/projects");

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
