import { UseMutateFunction } from "@tanstack/react-query";
import { Project } from "../type";

type Props = {
  projects: Project[];
  mutate: UseMutateFunction<string, Error, string, unknown>;
};

export const ProjectCard: React.FC<Props> = ({ projects, mutate }) => {
  return (
    <>
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
            <button className="absolute top-16 right-2 w-8 h-8 flex items-center justify-center text-sm bg-orange-600 text-white hover:bg-orange-700 py-1 px-3 rounded">
              🖍️
            </button>
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-2">
              {project.isFinished ? "Terminé" : "En cours"}
            </p>
            <p className="text-gray-600">
              {project.description || "Aucune description disponible"}
            </p>
            <p className="text-blue-700 text-xl mt-4">Catégories :</p>
            {project.categories.length > 0
              ? project.categories.map((category) => category.name).join(", ")
              : "Aucune catégorie"}
          </div>
        ))}
      </div>
    </>
  );
};
