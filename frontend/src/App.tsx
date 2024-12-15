import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// import ProjectsPage from './pages/ProjectsPage';
// import TasksPage from './pages/TasksPage';
// import ProfilePage from './pages/ProfilePage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour gérer les recherches depuis la Navbar
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <Router>
      {/* Navbar avec la fonction de recherche */}
      <Navbar onSearch={handleSearch} />
      <div className="min-h-screen pt-20 bg-gray-100 text-gray-800">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          {/* <Route path="/projects" element={<ProjectsPage searchQuery={searchQuery} />} />
          <Route path="/tasks" element={<TasksPage searchQuery={searchQuery} />} />
          <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="*" element={<h1 className="text-center text-3xl font-bold mt-20">404 - Page non trouvée</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
