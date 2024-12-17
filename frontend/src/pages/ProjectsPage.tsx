import { useProjects } from "../hooks/useProjects";
import { useDeleteProjects } from "../hooks/mutation/useDeleteProjects";

const ProjectsPage: React.FC = () => {
  const { isPending, isError, isSuccess, mutate } = useDeleteProjects();
  const { data: projects, error } = useProjects();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Liste des Projets</h1>

      {/* Gestion des erreurs de chargement */}
      {error && <div className="text-red-600">Erreur lors du chargement des projets.</div>}

      {/* Gestion de l'état de suppression */}
      {isPending && (
        <div className="text-blue-500 mb-4">Suppression en cours...</div>
      )}
      {isSuccess && (
        <div className="text-green-600 mb-4">
          Projet supprimé avec succès.
        </div>
      )}
      {isError && (
        <div className="text-red-600 mb-4">
          Une erreur est survenue lors de la suppression.
        </div>
      )}

      {/* Affichage des projets */}
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-4 rounded shadow relative ${
                project.isFinished
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-yellow-100 border-l-4 border-yellow-500"
              }`}
            >
              {/* Bouton de suppression */}
              <button
                onClick={() => mutate(project.id.toString())}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
              >
                X
              </button>
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-700 mb-2">
                {project.isFinished ? "Terminé" : "En cours"}
              </p>
              <p className="text-gray-600">
                {project.description || "Aucune description disponible"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun projet trouvé.</p>
      )}
    </div>
  );
};

export default ProjectsPage;
