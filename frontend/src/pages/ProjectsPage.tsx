import React from 'react';
import { useProjects } from '../hooks/useProjects';

const ProjectsPage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Liste des Projets</h1>
      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.isFinished ? "Terminé" : "En cours"}</p>
              <p>{project.description || "Aucune description disponible"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun projet trouvé.</p>
      )}
    </div>
  );
};

export default ProjectsPage;
