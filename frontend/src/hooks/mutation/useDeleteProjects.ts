import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { queryClient } from "../../main";

export const useDeleteProjects = () =>
  useMutation({
    mutationFn: (projectId: string) => {
      return api.delete<string>(`/projects/${projectId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']})
    }
  })

  ;
