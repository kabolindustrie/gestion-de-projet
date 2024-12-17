import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full z-50 fixed top-0 shadow-md bg-white">
      <div className="flex justify-between items-center flex-wrap p-4 border-b bg-gradient-to-r from-blue-500 to-blue-700">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link to="/" className="flex items-center gap-2">
            📝 Gestion de Projet
          </Link>
        </div>

        {/* Menu burger pour mobile */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white hover:text-gray-200"
          >
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>

        {/* Menu principal */}
        <ul
          className={`lg:flex lg:gap-6 lg:items-center absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-gradient-to-r from-blue-500 to-blue-700 lg:bg-transparent rounded-md p-4 lg:p-0 transition-all duration-300 ease-in-out ${
            menuOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          <li className="py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-black text-white text-lg font-semibold">
            <Link to="/">🏠 Tableau de bord</Link>
          </li>
          <li className="py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-dark text-white text-lg font-semibold">
            <Link to="/projects">📋 Projets</Link>
          </li>
          {/* <li className="py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-dark text-white text-lg font-semibold">
            <Link to="/tasks">✅ Tâches</Link>
          </li> */}
          <li className="py-2 px-4 rounded-lg cursor-pointer text-center hover:bg-dark text-white text-lg font-semibold">
            <Link to="/profile">👤 Profil</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
