import { useState, useEffect } from "react";

// Exemple de données utilisateur et projets en attendant de connecter le back et le front
const userData = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
  projects: [
    {
      id: 1,
      title: "Développement d'une Application Mobile",
      status: "Terminé",
    },
    {
      id: 2,
      title: "Site Web E-commerce",
      status: "Terminé",
    },
    {
      id: 3,
      title: "Mise en place d'un Système CRM",
      status: "En cours",
    },
    {
      id: 4,
      title: "Application de Gestion de Tâches",
      status: "En cours",
    },
  ],
  collaborators: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ],
};

function ProfilePage() {
  const [user, setUser] = useState(userData);

  // Calculer le nombre de projets terminés, en cours, etc.
  const completedProjects = user.projects.filter(
    (project) => project.status === "Terminé"
  ).length;

  const ongoingProjects = user.projects.filter(
    (project) => project.status === "En cours"
  ).length;

  const totalProjects = user.projects.length;
  const totalCollaborators = user.collaborators.length;

  useEffect(() => {
    // Ceci est un exemple, plus tard on peut récupérer ces données depuis une API
    setUser(userData);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Mon Profil</h1>
        <p className="text-gray-600">Détails personnels et projets associés.</p>
      </header>

      <main className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Informations Personnelles
          </h2>
          <p className="text-gray-600">
            <strong>Nom :</strong> {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-600">
            <strong>Email :</strong> {user.email}
          </p>
        </div>

        {/* Informations sur les projets */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Statistiques des Projets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-500 p-4 text-white rounded-lg">
              <h3 className="text-xl font-semibold">Projets Terminés</h3>
              <p className="text-2xl">{completedProjects}</p>
            </div>
            <div className="bg-yellow-500 p-4 text-white rounded-lg">
              <h3 className="text-xl font-semibold">Projets en Cours</h3>
              <p className="text-2xl">{ongoingProjects}</p>
            </div>
            <div className="bg-green-500 p-4 text-white rounded-lg">
              <h3 className="text-xl font-semibold">Projets Totaux</h3>
              <p className="text-2xl">{totalProjects}</p>
            </div>
          </div>
        </div>

        {/* Informations sur les collaborateurs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Collaborateurs
          </h2>
          <p className="text-gray-600 mb-2">
            Vous avez collaboré avec {totalCollaborators} collaborateur(s).
          </p>
          <ul className="list-disc pl-6">
            {user.collaborators.map((collaborator) => (
              <li key={collaborator.id} className="text-gray-600">
                {collaborator.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
