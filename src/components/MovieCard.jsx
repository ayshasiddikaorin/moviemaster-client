import { Star, Calendar, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie,
}) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-orange-800/30 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/500x750?text=No+Poster"}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <h3 className="text-xl font-bold text-orange-400 mb-2">{movie.title}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{movie.rating || "N/A"}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{movie.releaseYear}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{movie.plotSummary || "No description"}</p>

        {/* View Details inside hover overlay */}
        <Link
          to={`/movie/${movie._id}`}
          className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-bold text-center text-white hover:scale-105 transition-transform"
        >
          View Details
        </Link>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg truncate text-orange-300">{movie.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1 text-orange-400">
            <Star size={16} className="fill-current" />
            {movie.rating || "N/A"}
          </span>
          <span className="text-sm text-gray-400">{movie.releaseYear}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
