import { useState, useEffect, useContext } from "react";
import MovieCard from "../../components/MovieCard";
import { api } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  
  const addedBy = user?.email || null;

  useEffect(() => {
    if (addedBy) {
      api.getWatchlist(addedBy)
        .then(data => {
          setWatchlist(data.map(item => item.originalMovie)); // Use originalMovie for full details
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [addedBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">My Watchlist</h1>

      {!addedBy ? (
        <p className="text-gray-300">Please login to view your watchlist.</p>
      ) : watchlist.length === 0 ? (
        <p className="text-gray-300">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;