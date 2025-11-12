import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddMoviePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please login to add movies");
      navigate("/login");
      return;
    }

    setLoading(true);

    // Build the exact payload the API expects
    const payload = {
      title: data.title,
      genre: data.genre,
      releaseYear: parseInt(data.releaseYear, 10),
      director: data.director,
      cast: data.cast,
      rating: parseFloat(data.rating),
      duration: parseInt(data.duration, 10),
      plotSummary: data.plotSummary,
      posterUrl: data.posterUrl,
      language: data.language,
      country: data.country,
      addedBy: user.email,
      nowShowing: data.nowShowing === "true", // API expects boolean
    };

    try {
      const res = await fetch("http://localhost:5000/api/movies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to add movie");
      }

      toast.success("Movie added successfully!");
      reset();
      navigate("/my-collection");
    } catch (err) {
      toast.error(err.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-black flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-orange-500/30 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Add New Movie
          </h1>
          <p className="text-orange-300 text-sm mt-2">
            Share your favorite film
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Movie Title"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Poster URL */}
          <div>
            <input
              {...register("posterUrl", { required: "Poster URL is required" })}
              type="url"
              placeholder="Poster URL"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.posterUrl && (
              <p className="text-red-400 text-xs mt-1">
                {errors.posterUrl.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Min 0" },
                max: { value: 10, message: "Max 10" },
              })}
              type="number"
              step="0.1"
              placeholder="Rating (0-10)"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.rating && (
              <p className="text-red-400 text-xs mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Genre */}
          <div>
            <select
              {...register("genre", { required: "Genre is required" })}
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition appearance-none"
            >
              <option value="">Select Genre</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
            </select>
            {errors.genre && (
              <p className="text-red-400 text-xs mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Release Year */}
          <div>
            <input
              {...register("releaseYear", {
                required: "Release Year is required",
                min: { value: 1900, message: "Min 1900" },
              })}
              type="number"
              placeholder="Release Year"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.releaseYear && (
              <p className="text-red-400 text-xs mt-1">
                {errors.releaseYear.message}
              </p>
            )}
          </div>

          {/* Director */}
          <div>
            <input
              {...register("director", { required: "Director is required" })}
              type="text"
              placeholder="Director"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.director && (
              <p className="text-red-400 text-xs mt-1">
                {errors.director.message}
              </p>
            )}
          </div>

          {/* Cast */}
          <div>
            <input
              {...register("cast", { required: "Cast is required" })}
              type="text"
              placeholder="Cast (comma separated)"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.cast && (
              <p className="text-red-400 text-xs mt-1">{errors.cast.message}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <input
              {...register("duration", {
                required: "Duration is required",
                min: { value: 1, message: "Min 1 min" },
              })}
              type="number"
              placeholder="Duration (minutes)"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.duration && (
              <p className="text-red-400 text-xs mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Language */}
          <div>
            <input
              {...register("language", { required: "Language is required" })}
              type="text"
              placeholder="Language"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.language && (
              <p className="text-red-400 text-xs mt-1">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              placeholder="Country"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.country && (
              <p className="text-red-400 text-xs mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Now Showing */}
          <div>
            <select
              {...register("nowShowing", { required: "Select showing status" })}
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-300 transition appearance-none"
            >
              <option value="">Now Showing?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.nowShowing && (
              <p className="text-red-400 text-xs mt-1">
                {errors.nowShowing.message}
              </p>
            )}
          </div>

          {/* Plot Summary */}
          <div>
            <textarea
              {...register("plotSummary", {
                required: "Plot Summary is required",
              })}
              placeholder="Plot Summary"
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.plotSummary && (
              <p className="text-red-400 text-xs mt-1">
                {errors.plotSummary.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70"
          >
            {loading ? "Adding…" : "Add Movie"}
          </button>
        </form>

        <p className="text-center text-orange-300 text-sm mt-6">
          Changed your mind?{" "}
          <Link
            to="/movies"
            className="text-orange-500 font-bold hover:underline"
          >
            Back to Movies
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AddMoviePage;
