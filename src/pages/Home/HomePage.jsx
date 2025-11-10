import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/movies")
      .then((res) => {
        // নিশ্চিত করো যে res.data একটা এরে
        const movieData = Array.isArray(res.data) ? res.data : [];
        setMovies(movieData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setMovies([]); // এরর হলেও এরে রাখো
        setLoading(false);
      });
  }, []);

  // লোডিং চেক
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // নিশ্চিত করো movies একটা এরে
  const safeMovies = Array.isArray(movies) ? movies : [];

  // সেকশনের জন্য ডাটা
  const featuredMovies = safeMovies.slice(0, 5);
  const topRated = [...safeMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const recentlyAdded = [...safeMovies]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const genres = [
    "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance", "Thriller", "Animation"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Carousel */}
      <section className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <div className="carousel w-full h-full">
          {featuredMovies.length > 0 ? (
            featuredMovies.map((movie, index) => (
              <div
                key={movie._id || index}
                id={`slide${index}`}
                className="carousel-item relative w-full h-full"
              >
                <img
                  src={movie.posterUrl || "https://i.ibb.co/0jK6Z3t/placeholder.jpg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">
                    {movie.title}
                  </h1>
                  <p className="text-sm md:text-lg opacity-90 mb-3">
                    {movie.genre} • {movie.releaseYear} • {movie.duration} min
                  </p>
                  <Link
                    to={`/movies/${movie._id}`}
                    className="btn btn-primary btn-sm md:btn-md"
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-xl">No featured movies yet.</p>
            </div>
          )}
        </div>

        {/* Carousel Dots */}
        {featuredMovies.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredMovies.map((_, i) => (
              <a
                key={i}
                href={`#slide${i}`}
                className="btn btn-xs btn-circle bg-white/40 hover:bg-white/70 text-xs"
              >
                {i + 1}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <div className="text-4xl font-bold">{safeMovies.length}</div>
          <p className="text-white/80">Total Movies</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <div className="text-4xl font-bold">150+</div>
          <p className="text-white/80">Active Users</p>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <div className="text-4xl font-bold">
            {safeMovies.length > 0
              ? (safeMovies.reduce((a, b) => a + (b.rating || 0), 0) / safeMovies.length).toFixed(1)
              : "0"}
          </div>
          <p className="text-white/80">Avg Rating</p>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Top Rated Movies
        </h2>
        {topRated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topRated.map((movie) => (
              <div
                key={movie._id}
                className="transform transition duration-300 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No movies available.</p>
        )}
      </section>

      {/* Recently Added */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Recently Added
        </h2>
        {recentlyAdded.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentlyAdded.map((movie) => (
              <Link key={movie._id} to={`/movies/${movie._id}`} className="group">
                <img
                  src={movie.posterUrl || "https://i.ibb.co/0jK6Z3t/placeholder.jpg"}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                />
                <p className="text-sm font-medium mt-2 text-center truncate px-2">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recent movies.</p>
        )}
      </section>

      {/* Genre Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Browse by Genre</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((genre) => (
            <Link
              key={genre}
              to={`/movies?genre=${genre}`}
              className="badge badge-lg badge-outline hover:badge-primary transition-all px-4 py-2"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* About Platform */}
      <section className="bg-base-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to MovieMaster Pro
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          Organize, discover, and manage your favorite movies in one place. Add
          personal collections, rate movies, and explore trending titles with
          advanced filters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <div className="text-5xl mb-2">Star</div>
            <p className="font-semibold">Rate & Review</p>
          </div>
          <div>
            <div className="text-5xl mb-2">Heart</div>
            <p className="font-semibold">Build Watchlist</p>
          </div>
          <div>
            <div className="text-5xl mb-2">Paintbrush</div>
            <p className="font-semibold">Dark/Light Mode</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;