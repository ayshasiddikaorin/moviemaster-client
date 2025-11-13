// src/pages/AllMoviesPage.jsx
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { api } from "../../utils/api";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxDuration, setMaxDuration] = useState('');

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

  const filteredMovies = movies.filter(movie => {
    if (searchTitle && !movie.title.toLowerCase().includes(searchTitle.toLowerCase())) return false;
    if (selectedGenre && !movie.genre.includes(selectedGenre)) return false;
    if (minRating && movie.rating < parseFloat(minRating)) return false;
    if (maxDuration && movie.duration > parseInt(maxDuration)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black py-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-center mb-12">
          All Movies
        </h1>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
          />
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition appearance-none"
          >
            <option value="">Select Genre</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
          </select>
          <input
            type="number"
            placeholder="Min rating (e.g. 7.0)"
            value={minRating}
            onChange={e => setMinRating(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            step="0.1"
            min="0"
            max="10"
          />
          <input
            type="number"
            placeholder="Max duration (minutes)"
            value={maxDuration}
            onChange={e => setMaxDuration(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            min="0"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} showWatchlistButton={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;