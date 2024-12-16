import { useForm } from "react-hook-form";
import { useCreateProjects } from "../hooks/mutation/useCreateProjects";
import { useCategories } from "../hooks/useCategories";
import { useUsers } from "../hooks/useUsers";
// interface User {
//   id: number;
//   firstName: string;
// }

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

export default function NewModalContent({ closeModal }: ModalContentProps) {
  const {
    data: categories,
    isPending: isCategoriesPending,
    error: isCategoriesError,
  } = useCategories();
  const {
    data: users,
    isPending: isUsersPending,
    error: isUsersError,
  } = useUsers();
  const { isPending, isError, isSuccess, mutate } = useCreateProjects();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
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
        <button
          onClick={closeModal}
          className="absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Créer un nouveau projet
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Titre du projet :
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Entrez le titre"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {errors?.name && <div className="bg-red-500"> titre requis </div>}
          </div>

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
              <div className="bg-red-900">{errors.description.message}</div>
            )}
          </div>
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

          {/* console.log({ data, isSuccess, isPending, isError }); */}

          {isSuccess && (
            <div className="bg-green-300">Le projet a bien ete cree</div>
          )}

          {isError && (
            <div className="bg-red-300">OOps Le projet n'a pas ete cree</div>
          )}

          {isPending ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
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
      </div>
    </div>
  );
}
