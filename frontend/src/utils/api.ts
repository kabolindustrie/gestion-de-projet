const api = {
  // Méthode GET
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`http://localhost:3000/api${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Ajoutez des credentials ici si nécessaire
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur inconnue");
    }
  },

  // Méthode POST
  async post<T>(url: string, body: object): Promise<T> {
    try {
      const response = await fetch(`http://localhost:3000/api${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création des données");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur inconnue");
    }
  },

  // Méthode PUT
  async put<T>(url: string, body: object): Promise<T> {
    try {
      const response = await fetch(`http://localhost:3000/api${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des données");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur inconnue");
    }
  },

  // Méthode DELETE
  async delete<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`http://localhost:3000/api${url}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression des données");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur inconnue");
    }
  },
};

export default api;
