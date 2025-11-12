// src/utils/api.js
// .env ছাড়া → সব হার্ডকোড
const API_URL = "http://localhost:5000"; // লোকাল (production-এ চেঞ্জ করো)

// Helper: Get Firebase ID Token
const getAuthToken = () => localStorage.getItem("fbIdToken");

// Common fetch with token + error handling
const apiFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}/api${url}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  // DELETE returns no content
  if (res.status === 204) return null;
  return res.json();
};

// API Object
export const api = {
  async getMovies() {
    return apiFetch("/movies");
  },

  async getMovieById(id) {
    return apiFetch(`/movies/${id}`);
  },

  async addMovie(movie) {
    return apiFetch("/movies", {
      method: "POST",
      body: JSON.stringify(movie),
    });
  },

  async updateMovie(id, movie) {
    return apiFetch(`/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
    });
  },

  async deleteMovie(id) {
    return apiFetch(`/movies/${id}`, { method: "DELETE" });
  },
};