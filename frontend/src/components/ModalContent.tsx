import { FormEvent, useState, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
}

interface ModalContentProps {
  closeModal: () => void;
}

export default function ModalContent({ closeModal }: ModalContentProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userIds, setUserIds] = useState<number[]>([]);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]); // Liste des utilisateurs
  const [categories] = useState([
    { id: 1, name: "Web" },
    { id: 2, name: "Mobile" },
    { id: 3, name: "Data Science" },
  ]);

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users"); 
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const projectData = {
      name: title,
      description,
      userIds,
      categoryIds,
      isFinished,
    };

    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de la création du projet :", errorData);
        throw new Error(errorData.message || "Erreur inconnue");
      }

      console.log("Projet créé avec succès !");
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la création du projet", error);
    }
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Catégories :
            </label>
            <select
              multiple
              value={categoryIds.map(String)}
              onChange={(e) =>
                setCategoryIds(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Utilisateurs assignés :
            </label>
            <select
              multiple
              value={userIds.map(String)} // IDs sélectionnés convertis en chaînes
              onChange={(e) =>
                setUserIds(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Statut :
            </label>
            <input
              type="checkbox"
              checked={isFinished}
              onChange={(e) => setIsFinished(e.target.checked)}
              className="mr-2"
            />
            <span>Le projet est terminé</span>
          </div>

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
