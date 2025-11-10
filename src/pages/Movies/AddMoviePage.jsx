import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
// import { db } from "../../firebase/firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddMoviePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please login to add movies");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "movies"), {
        title: data.title,
        year: parseInt(data.year),
        genre: data.genre,
        description: data.description,
        poster: data.poster,
        rating: parseFloat(data.rating),
        addedBy: user.email,
        createdAt: serverTimestamp(),
      });
      toast.success("Movie added successfully!");
      reset();
      navigate("/movies/my-collection");
    } catch (err) {
      toast.error("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-black flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* ↑ py-16 যোগ করা হয়েছে যাতে উপরে নিচে যথেষ্ট ফাঁকা থাকে */}
      
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
          <p className="text-orange-300 text-sm mt-2">Share your favorite film</p>
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
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Poster URL */}
          <div>
            <input
              {...register("poster", { required: "Poster URL is required" })}
              type="url"
              placeholder="Poster URL"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.poster && <p className="text-red-400 text-xs mt-1">{errors.poster.message}</p>}
          </div>

          {/* Rating */}
          <div>
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Min 0" },
                max: { value: 10, message: "Max 10" }
              })}
              type="number"
              step="0.1"
              placeholder="Rating (0-10)"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating.message}</p>}
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
            {errors.genre && <p className="text-red-400 text-xs mt-1">{errors.genre.message}</p>}
          </div>

          {/* Year */}
          <div>
            <input
              {...register("year", {
                required: "Release Year is required",
                min: { value: 1900, message: "Min 1900" }
              })}
              type="number"
              placeholder="Release Year"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year.message}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("plotSummary", { required: "Plot Summary is required" })}
              placeholder="Plot Summary"
              rows="4"
              className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
            />
            {errors.plotSummary && <p className="text-red-400 text-xs mt-1">{errors.plotSummary.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </form>

        <p className="text-center text-orange-300 text-sm mt-6">
          Changed your mind?{" "}
          <Link to="/movies" className="text-orange-500 font-bold hover:underline">
            Back to Movies
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AddMoviePage;
