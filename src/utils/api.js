
const API_URL = "http://localhost:5000"; 


const getAuthToken = () => localStorage.getItem("fbIdToken");

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

  // DELETE or empty response
  if (res.status === 204) return null;
  return res.json();
};

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

  async getWatchlist(addedBy) {
    // return apiFetch("/");
        return apiFetch(`/myWatchList/${addedBy}`);
  },

  async addToWatchlist(movie) {
    return apiFetch("/watchListInsert", {
      method: "POST",
      body: JSON.stringify(movie),
    });
  },

  async removeFromWatchlist(addedBy, movieId) {
    return apiFetch(`/watchListDelete/${encodeURIComponent(addedBy)}/${movieId}`, { method: "DELETE" });
  },

  async checkWatchlist(addedBy, movieId) {
    return apiFetch(`/watchlist/check/${encodeURIComponent(addedBy)}/${movieId}`);
  },
};
