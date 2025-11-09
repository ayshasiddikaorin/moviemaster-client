import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend API call: POST /movies
    console.log("Add Movie:", movie);
    navigate("/movies"); // redirect after adding
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={movie.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={movie.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={movie.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMoviePage;
