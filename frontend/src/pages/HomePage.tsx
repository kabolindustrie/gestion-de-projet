function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Bienvenue sur la HomePage !
        </h1>
        <p className="text-gray-600">
          C'est votre page d'accueil avec Tailwind CSS et React.
        </p>
      </header>
      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 text-lg">
          créer un nouveau projet.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
          Découvrir Plus
        </button>
      </main>
    </div>
  );
}

export default HomePage;
