import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

interface Project {
  id: number;
  name: string;
  description?: string;
  isFinished: boolean;
}

type FormData = {
  name: string;
  description: string;
  userIds: string;
  isFinished: boolean;
  categoryIds: string;
};

export const useCreateProjects = () =>
  useMutation({
    mutationFn: (body: FormData) => {
      return api.post<Project[]>("/projects", {
        ...body,
      });
    },
  });
