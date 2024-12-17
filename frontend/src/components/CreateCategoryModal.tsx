import { useState } from "react";
import { useForm } from "react-hook-form";

interface CategoryModalContentProps {
  closeModal: () => void;
}

type FormData = {
  name: string;
};

export default function CreateCategoryModal({ closeModal }: CategoryModalContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null);

    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur inconnue");
      }

      setIsSuccess(true);
      setTimeout(() => {
        closeModal(); 
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[400px] relative rounded p-7 bg-gray-50 shadow-lg"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Créer une nouvelle catégorie</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Champ Nom de la catégorie */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom de la catégorie :</label>
            <input
              type="text"
              {...register("name", { required: "Le nom est requis." })}
              placeholder="Entrez le nom"
              className={`w-full p-2 border rounded-md focus:outline-none ${
                errors.name ? "border-red-500 focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-green-400"
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
            )}
          </div>

          {/* Retour visuel : succès */}
          {isSuccess && (
            <div className="bg-green-200 text-green-800 p-2 rounded-md text-center">
              Catégorie créée avec succès !
            </div>
          )}

          {/* Retour visuel : erreur */}
          {isError && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md text-center">
              Erreur : {isError}
            </div>
          )}

          {/* Bouton de soumission ou loader */}
          {isLoading ? (
            <div role="status" className="flex justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
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
              className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
            >
              Créer la catégorie
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
