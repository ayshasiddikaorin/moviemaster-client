import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <Link
        to={`/movie/${movie.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
