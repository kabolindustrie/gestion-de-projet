import { useState } from "react";

// Exemple de données de projets en attendant de connecter le back et le front
const projectsData = [
  {
    id: 1,
    title: "Développement d'une Application Mobile",
    description: "Création d'une application mobile de gestion de projet.",
    category: "Développement",
    status: "En cours",
  },
  {
    id: 2,
    title: "Site Web E-commerce",
    description: "Développement d'un site web pour la vente en ligne.",
    category: "Web Design",
    status: "En cours",
  },
  {
    id: 3,
    title: "Mise en place d'un Système CRM",
    description: "Développement d'un système de gestion de la relation client.",
    category: "CRM",
    status: "Terminé",
  },
  {
    id: 4,
    title: "Application de Gestion de Tâches",
    description: "Application pour gérer les tâches d'une équipe.",
    category: "Développement",
    status: "En cours",
  },
];

// Liste des catégories de projets en attendant de lier le back et le front
const categories = ["Tous", "Développement", "Web Design", "CRM"];

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  // Filtrer les projets par catégorie
  const filteredProjects =
    selectedCategory === "Tous"
      ? projectsData.filter((project) => project.status === "En cours")
      : projectsData.filter(
          (project) =>
            project.status === "En cours" && project.category === selectedCategory
        );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Projets en Cours</h1>
        <p className="text-gray-600">Filtrez les projets selon la catégorie.</p>
      </header>

      {/* Sélecteur de catégories */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des projets */}
      <main className="w-full max-w-6xl mx-auto p-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Aucun projet en cours dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-blue-500 font-medium">{project.category}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectsPage;
