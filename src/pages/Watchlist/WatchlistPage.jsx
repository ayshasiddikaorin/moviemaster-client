import React from "react";
import MovieCard from "../../components/MovieCard";
import { useWatchlist } from "../../context/WatchlistContext";

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-300">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
