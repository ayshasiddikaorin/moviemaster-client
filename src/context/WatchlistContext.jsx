import { createContext, useContext, useState } from "react";

// Context
const WatchlistContext = createContext();

// Custom hook
export const useWatchlist = () => useContext(WatchlistContext);

// Provider
export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => (!prev.some((m) => m.id === movie.id) ? [...prev, movie] : prev));
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
