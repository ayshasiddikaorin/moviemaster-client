// src/pages/Movies/MyCollectionPage.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";
import MovieCard from "../../components/MovieCard";

const MyCollectionPage = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyMovies = async () => {
      try {
        const data = await api.getMovies();
        const myMovies = data.filter(m => m.addedBy === user.email);
        setMovies(myMovies);
      } catch (err) {
        toast.error("Failed to load your collection");
      } finally {
        setLoading(false);
      }
    };

    fetchMyMovies();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.deleteMovie(id);
      setMovies(prev => prev.filter(m => m._id !== id));
      toast.success("Movie deleted from collection!");
    } catch (err) {
      toast.error("Failed to delete movie");
    }
  };

  // লগইন না থাকলে
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-orange-400">
        <h2 className="text-3xl font-bold mb-4">Please Login</h2>
        <p className="text-gray-300">You need to login to view your collection.</p>
      </div>
    );
  }

  // লোডিং
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // কোনো মুভি নেই
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-orange-400">
        <h2 className="text-3xl font-bold mb-4">Your Collection is Empty</h2>
        <p className="text-gray-300">Add movies from the All Movies page!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-24 px-4">
      <div className="container mx-auto">
        {/* হেডার */}
        <h1 className="text-5xl md:text-6xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          My Collection ({movies.length})
        </h1>

        {/* মুভি গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              showActions={true}
              onDelete={() => handleDelete(movie._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollectionPage;