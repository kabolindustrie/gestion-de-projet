import { useProjects } from "../hooks/useProjects";
import { useDeleteProjects } from "../hooks/mutation/useDeleteProjects";


const ProjectsPage: React.FC = () => {
  const { isPending, isError, isSuccess, mutate } = useDeleteProjects();
  const { data: projects, error } = useProjects();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Liste des Projets</h1>
      {projects && projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-gray-100 rounded shadow">
            <button
          onClick={() => mutate(project.id.toString())}
          className="top-2 right-0 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded">X</button>
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.isFinished ? "Terminé" : "En cours"}</p>
              <p>{project.description || "Aucune description disponible"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun projet trouvé.</p>
      )}

      {error && <div>Error ooops</div>}
    </div>
  );
};

export default ProjectsPage;
