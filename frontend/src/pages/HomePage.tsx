import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "../components/ModalContent";

function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const projects = [
    {
      id: 1,
      title: "Développement d'une Application Mobile",
      description: "Création d'une application mobile de gestion de projet.",
      category: "Développement",
    },
    {
      id: 2,
      title: "Site Web E-commerce",
      description: "Développement d'un site web pour la vente en ligne.",
      category: "Web Design",
    },
    {
      id: 3,
      title: "Mise en place d'un Système CRM",
      description: "Développement d'un système de gestion de la relation client.",
      category: "CRM",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header avec vidéo en background */}
      <header className="relative text-center py-32">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/images/bannerProject.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        <div className="relative z-10 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
          <h1 className="text-4xl font-bold text-light mb-2">
            Bienvenue sur Gestion de projet !
          </h1>
          <p className="text-white">
            C'est votre page d'accueil avec Tailwind CSS et React.
          </p>

          {/* Button pour créer un projet */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowModal(!showModal)}
              className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Créer un projet
            </button>
          </div>
        </div>
      </header>

      {/* Section des projets */}
      <main className="w-full max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Exemples de projets
        </h2>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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

        {/* Modal */}
        {showModal && createPortal(<ModalContent closeModal={() => setShowModal(!showModal)} />, document.body)}
      </main>
    </div>
  );
}

export default HomePage;
