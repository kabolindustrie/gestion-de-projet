import { parseAsInteger, useQueryState } from "nuqs";
import { ProjectCard } from "../components/ProjectCard";
import { useDeleteProjects } from "../hooks/mutation/useDeleteProjects";
import { useCategories } from "../hooks/useCategories";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage: React.FC = () => {
  const { isPending, isError, isSuccess, mutate } = useDeleteProjects();
  const { data: projects, error } = useProjects();
  const { data: categories } = useCategories();

  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    parseAsInteger
  );

  const filteredProjects =
    categoryFilter && projects
      ? projects.filter(({ categories }) =>
          categories.some(({ id }) => id === categoryFilter)
        )
      : projects;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center m-8 ">
        <h1 className="text-3xl font-bold mb-6">Liste des Projets</h1>
        {categories && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Filtre par Catégories :
            </label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={categoryFilter || ""}
              onChange={(e) =>
                setCategoryFilter(parseInt(e.target.value) || null)
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              className="mt-2 flex bg-red-500 p-1 rounded cursor-pointer text-white hover:bg-red-600"
              onClick={() => setCategoryFilter(null)}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Gestion des erreurs de chargement */}
      {error && (
        <div className="text-red-600">
          Erreur lors du chargement des projets.
        </div>
      )}

      {/* Gestion de l'état de suppression */}
      {isPending && (
        <div className="text-blue-500 mb-4">Suppression en cours...</div>
      )}
      {isSuccess && (
        <div className="text-green-600 mb-4">Projet supprimé avec succès.</div>
      )}
      {isError && (
        <div className="text-red-600 mb-4">
          Une erreur est survenue lors de la suppression.
        </div>
      )}

      {/* Affichage des projets */}
      {filteredProjects && filteredProjects.length > 0 ? (
        <ProjectCard projects={filteredProjects} mutate={mutate} />
      ) : (
        <p className="text-gray-500">Aucun projet trouvé.</p>
      )}
    </div>
  );
};

export default ProjectsPage;
