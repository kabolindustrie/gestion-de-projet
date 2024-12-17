import { useForm } from "react-hook-form";
import { useCreateProjects } from "../hooks/mutation/useCreateProjects";
import { useCategories } from "../hooks/useCategories";
import { useUsers } from "../hooks/useUsers";

interface ModalContentProps {
  closeModal: () => void;
}

type FormData = {
  name: string;
  description: string;
  userIds: string;
  isFinished: boolean;
  categoryIds: string;
};

export default function CreateProjectModal({ closeModal }: ModalContentProps) {
  
  // Récupération des catégories
  const {
    data: categories,
    isPending: isCategoriesPending,
    error: isCategoriesError,
  } = useCategories();

  // Récupération des utilisateurs
  const {
    data: users,
    isPending: isUsersPending,
    error: isUsersError,
  } = useUsers();

  // Mutation pour créer un projet
  const { isPending, isError, isSuccess, mutate } = useCreateProjects();

  // Gestion du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Soumission du formulaire
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div
      onClick={closeModal}
      className="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[500px] relative rounded p-7 bg-gray-50 shadow-lg"
      >
        {/* Bouton de fermeture */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
        >
          X
        </button>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Créer un nouveau projet
        </h2>

        {/* Gestion des erreurs de chargement */}
        {isCategoriesError && (
          <div className="text-red-600 mb-2">
            Erreur de chargement des catégories.
          </div>
        )}
        {isUsersError && (
          <div className="text-red-600 mb-2">
            Erreur de chargement des utilisateurs.
          </div>
        )}

        {/* Gestion des états de chargement */}
        {isCategoriesPending || isUsersPending ? (
          <div className="text-gray-500 mb-4">Chargement des données...</div>
        ) : (
          // Formulaire
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Champ Titre */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Titre du projet :
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Entrez le titre"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors?.name && <div className="text-red-500">Titre requis</div>}
            </div>

            {/* Champ Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description :
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Entrez la description"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                rows={4}
              />
              {errors?.description && (
                <div className="text-red-500">Description requise</div>
              )}
            </div>

            {/* Sélecteur de catégories */}
            {categories && (
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Catégories :
                </label>
                <select
                  multiple
                  {...register("categoryIds", { required: true })}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sélecteur d'utilisateurs */}
            {users && (
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Utilisateurs assignés :
                </label>
                <select
                  multiple
                  {...register("userIds", { required: true })}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Checkbox Statut */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Statut :
              </label>
              <input
                type="checkbox"
                {...register("isFinished")}
                className="mr-2"
              />
              <span>Le projet est terminé</span>
            </div>

            {/* Gestion des états de mutation */}
            {isSuccess && (
              <div className="bg-green-300 text-green-800 p-2 rounded">
                Le projet a bien été créé !
              </div>
            )}
            {isError && (
              <div className="bg-red-300 text-red-800 p-2 rounded">
                Oups, une erreur est survenue.
              </div>
            )}

            {/* Bouton de soumission */}
            {isPending ? (
              <div role="status" className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
                <span className="sr-only">Chargement...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
              >
                Créer le projet
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
