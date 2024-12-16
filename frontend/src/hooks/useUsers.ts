
  import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export interface User {
  id: number;
  firstName: string;
}

const fetchUsers = async () => await api.get<User[]>("/users");

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
