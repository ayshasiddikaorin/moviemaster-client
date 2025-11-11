// src/utils/api.js
const API_URL = "http://localhost:5000"; // .env ছাড়া

export const api = {
  async getMovies() {
    const res = await fetch(`${API_URL}/api/movies`);
    return res.json();
  },

  async addMovie(movie) {
    const res = await fetch(`${API_URL}/api/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });
    return res.json();
  },

  async deleteMovie(id) {
    await fetch(`${API_URL}/api/movies/${id}`, { method: "DELETE" });
  }
};