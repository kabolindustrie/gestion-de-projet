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

export const useEditProjects = () =>
  useMutation({
    mutationFn: ({
      body,
      projectId,
    }: {
      body: Partial<FormData>;
      projectId: string;
    }) => {
      return api.put<Project>(`/projects/${projectId}`, {
        ...body,
      });
    },
  });
