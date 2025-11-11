// src/pages/Movies/MyCollectionPage.jsx
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext"; // useAuth
import MovieCard from "../../components/MovieCard";

const MyCollectionPage = () => {
  const { user } = useAuth(); // useAuth দিয়ে user নাও
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getMovies()
        .then(data => {
          const myMovies = data.filter(m => m.addedBy === user.email);
          setMovies(myMovies);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm("Delete this movie?")) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/movies/${id}`, {
          method: "DELETE"
        });
        setMovies(movies.filter(m => m._id !== id));
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  if (!user) return <p className="text-center py-20 text-orange-300">Please login to view your collection</p>;
  if (loading) return <p className="text-center py-20 text-orange-300">Loading...</p>;

  return (
    <div className="min-h-screen bg-black py-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-center mb-12">
          My Collection ({movies.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              showActions={true}
              onEdit={(m) => alert("Edit: " + m.title)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollectionPage;