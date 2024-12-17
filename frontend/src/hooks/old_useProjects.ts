// import { useEffect, useState } from "react";
// import api from "../utils/api";

// interface Project {
//   id: number;
//   name: string;
//   description?: string;
//   isFinished: boolean;
// }

// export const useProjects_old = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get<Project[]>("/projects");
//         setProjects(response);
//       } catch (error) {
//         setError("Impossible de charger les projets");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return { projects, loading, error };
// };
