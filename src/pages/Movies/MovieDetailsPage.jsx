// src/pages/Movies/MovieDetailsPage.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaClock, FaCalendar, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [watchlistProcessing, setWatchlistProcessing] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchMovieAndCheckWatchlist = async () => {
      try {
        const data = await api.getMovieById(id);
        if (!mounted) return;

        setMovie(data);

        if (user && user.email) {
          const check = await api.checkWatchlist(user.email, data._id);
          console.log(check);
          setIsInWatchlist(!!check.exists); // Set based on API response
        }
      }
      // eslint-disable-next-line no-unused-vars
      catch (err) {
        toast.error("Movie not found");
        navigate("/movies");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMovieAndCheckWatchlist();
    return () => {
      mounted = false;
    };
  }, [id, navigate, user]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    setDeleting(true);
    try {
      await api.deleteMovie(id);
      toast.success("Movie deleted successfully");
      navigate("/my-collection");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete movie");
    } finally {
      setDeleting(false);
    }
  };

  const handleWatchlistClick = async () => {
    if (!movie) return;
    if (!user || !user.email) {
      toast.error("You must be logged in to manage your watchlist");
      return;
    }

    if (isInWatchlist) {
      setWatchlistProcessing(true);
      try {
        await api.removeFromWatchlist(user.email, movie._id);
        setIsInWatchlist(false); // Update state
        toast.info(`${movie.title} removed from Watchlist`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove from watchlist");
      } finally {
        setWatchlistProcessing(false);
      }
      return;
    }

    setWatchlistProcessing(true);
    try {
      // prepare payload -- include movieId and addedBy to let backend know owner
      const payload = {
        movieId: movie._id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        addedBy: user.email,
        originalMovie: movie, // optional: full movie object if you want
        createdAt: new Date()
      };

      await api.addToWatchlist(payload); 
      setIsInWatchlist(true); 
      toast.success(`${movie.title} added to Watchlist`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to watchlist");
    } finally {
      setWatchlistProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) return null;

  const isOwner = user && user.email === movie.addedBy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 px-4">
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
        >
          <FaArrowLeft /> 
        </Link>
      </div>

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative group">
              <img
                src={movie.posterUrl || "https://via.placeholder.com/500x750?text=No+Poster"}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl border border-orange-500/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {movie.title}
              </h1>
              <p className="text-orange-300 text-sm mt-2">
                Added by: <span className="font-semibold">{movie.addedBy}</span>
              </p>
            </div>

            {/* Rating & Year */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full">
                <FaStar className="text-orange-400" />
                <span className="font-bold text-orange-300">{movie.rating || "N/A"} / 10</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                <FaCalendar className="text-orange-400" />
                <span className="text-gray-300">{movie.releaseYear || "Unknown"}</span>
              </div>
              {movie.duration && (
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                  <FaClock className="text-orange-400" />
                  <span className="text-gray-300">{movie.duration} min</span>
                </div>
              )}
            </div>

            {/* Genre */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Genre:</span>
              <span className="px-3 py-1 bg-orange-600/30 text-orange-300 rounded-full text-sm font-medium">
                {movie.genre}
              </span>
            </div>

            {/* Director */}
            {movie.director && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Director:</span>
                <span className="text-white font-medium">{movie.director}</span>
              </div>
            )}

            {/* Cast */}
            {movie.cast && (
              <div>
                <p className="text-gray-400 mb-1">Cast:</p>
                <p className="text-white">{movie.cast}</p>
              </div>
            )}

            {/* Language & Country */}
            <div className="flex gap-6 text-sm">
              {movie.language && (
                <div>
                  <span className="text-gray-400">Language:</span>{" "}
                  <span className="text-white">{movie.language}</span>
                </div>
              )}
              {movie.country && (
                <div>
                  <span className="text-gray-400">Country:</span>{" "}
                  <span className="text-white">{movie.country}</span>
                </div>
              )}
            </div>

            {/* Plot Summary */}
            <div>
              <p className="text-gray-400 mb-2">Plot Summary:</p>
              <p className="text-gray-200 leading-relaxed">{movie.plotSummary || "No summary available."}</p>
            </div>

            {/* Watchlist Button */}
            <div className="mt-6">
              <button
                onClick={handleWatchlistClick}
                disabled={watchlistProcessing}
                className={`px-6 py-3 rounded-full font-bold text-white ${
                  isInWatchlist ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                } transition-colors disabled:opacity-70`}
              >
                {watchlistProcessing ? (isInWatchlist ? "Removing..." : "Adding...") : (isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist")}
              </button>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-4 mt-8">
                <Link
                  to={`/add-movie/${movie._id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  <FaEdit /> Edit Movie
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-70"
                >
                  <FaTrash /> {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;