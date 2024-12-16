import { FormEvent, useState } from "react";

interface CategoryModalContentProps {
  closeModal: () => void;
}

export default function CategoryModalContent({ closeModal }: CategoryModalContentProps) {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de la création de la catégorie :", errorData);
        throw new Error(errorData.message || "Erreur inconnue");
      }

      console.log("Catégorie créée avec succès !");
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie", error);
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom de la catégorie :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
          >
            Créer la catégorie
          </button>
        </form>
      </div>
    </div>
  );
}
