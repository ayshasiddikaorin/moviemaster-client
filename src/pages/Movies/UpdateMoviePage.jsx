import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
  });

  useEffect(() => {
    // Fetch movie by id from backend
    // Example:
    // fetch(`/api/movies/${id}`).then(res => res.json()).then(data => setMovie(data))
    setMovie({
      title: "Sample Movie",
      year: 2020,
      genre: "Action",
      description: "Sample description",
    });
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend API call: PUT /movies/:id
    console.log("Update Movie:", movie);
    navigate("/movies");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="year"
          value={movie.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMoviePage;
