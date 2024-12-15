import { FormEvent, useState } from "react";

// Typage des props pour TypeScript
interface ModalContentProps {
  closeModal: () => void;
}

export default function ModalContent({ closeModal }: ModalContentProps) {
  // États pour le formulaire
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      category,
      description,
    });
    // Ferme la modal après soumission
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center"
    >
      {/* Contenu de la modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[500px] relative rounded p-7 bg-gray-50 shadow-lg"
      >
        {/* Bouton pour fermer */}
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

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Champ Titre */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Titre du projet :
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Champ Catégorie */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Catégorie :
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Entrez la catégorie"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Champ Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description :
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Créer le projet
          </button>
        </form>
      </div>
    </div>
  );
}
