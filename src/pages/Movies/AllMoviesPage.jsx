// src/pages/AllMoviesPage.jsx
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { api } from "../../utils/api";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMovies()
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-center mb-12">
          All Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} showWatchlistButton={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;
