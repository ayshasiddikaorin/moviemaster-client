// src/pages/Home/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Star, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../utils/api";


// const movies = [
//   { id: 1, title: "TRON", rating: 9.1, year: 2024, genre: "Sci-Fi", poster: "https://www.filmyfenil.com/wp-content/uploads/2025/10/Tron-Ares-wallpaper.jpg", nowShowing: true },
//   { id: 2, title: "Avatar 3", rating: 0, year: 2025, genre: "Sci-Fi", poster: "https://images.hdqwalls.com/wallpapers/avatar-the-way-of-water-movie-4k-mi.jpg", nowShowing: true },

//   { id: 3, title: "Deadpool & Wolverine", rating: 8.8, year: 2024, genre: "Action", poster: "https://images.hdqwalls.com/wallpapers/marvel-deadpool-and-wolverine-4k-cp.jpg", nowShowing: true },
//   { id: 4, title: "The Batman 2", rating: 0, year: 2026, genre: "Action", poster: "https://images.hdqwalls.com/wallpapers/the-batman-2-movie-2027-9r.jpg", nowShowing: true },
// ];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("now");
  
  const [movies, setMovies] = useState([]);
 const [loading, setLoading] = useState(true);
  useEffect(() => {
      api.getMovies()
        .then(data => {
          setMovies(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
 const heroSlides = movies;
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

 if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const filteredMovies = activeTab === "now"
    ? movies.filter(m => m.nowShowing)
    : movies.filter(m => !m.nowShowing);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Slider */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          {heroSlides.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Slider Content */}
        <div className="relative z-20 h-full flex items-center container mx-auto px-4">
          <motion.div
            key={currentSlide}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
              {heroSlides[currentSlide]?.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-xl font-bold text-orange-400">{heroSlides[currentSlide]?.rating || "TBA"}</span>
              </div>
              <span className="text-gray-300">• {heroSlides[currentSlide]?.year}</span>
              <span className="text-gray-300">• {heroSlides[currentSlide]?.genre}</span>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                <Play size={20} /> Watch Trailer
              </button>
              <Link
                to="/movies"
                className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-orange-500/50 rounded-full font-bold hover:bg-orange-500/20 transition-all"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-orange-500/30 transition-all"
        >
          <ChevronLeft size={28} className="text-orange-400" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-orange-500/30 transition-all"
        >
          <ChevronRight size={28} className="text-orange-400" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-orange-500 w-8" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Now Showing / Coming Soon */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-8">
            Explore Movies
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/10 backdrop-blur-xl rounded-full p-1 mb-8">
            <button
              onClick={() => setActiveTab("now")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === "now"
                ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg"
                : "text-gray-300 hover:text-orange-400"
                }`}
            >
              Now Showing
            </button>
            <button
              onClick={() => setActiveTab("coming")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === "coming"
                ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg"
                : "text-gray-300 hover:text-orange-400"
                }`}
            >
              Coming Soon
            </button>
          </div>

          <Link
            to="/movies"
            className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-orange-500/50 rounded-full font-bold hover:bg-orange-500/20 transition-all"
          >
            View All Movies
          </Link>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie._id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-white/5 backdrop-blur-xl border border-orange-800/30 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-w-2 aspect-h-3 relative overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Hover Details */}
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-orange-400 mb-2">{movie.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{movie.rating || "TBA"}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{movie.genre}</p>
                <Link to={`/movie/${movie._id}`} className="w-full">
                  <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-bold hover:scale-105 transition-transform">
                    View Details
                  </button>
                </Link>
              </div>

              {/* Default Card Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{movie.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center gap-1 text-orange-400">
                    <Star size={16} className="fill-current" />
                    {movie.rating || "TBA"}
                  </span>
                  <span className="text-sm text-gray-400">{movie.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Section - Featured Collections */}
      <section className="py-16 bg-gradient-to-b from-transparent via-orange-900/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-8">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Top Rated", "Sci-Fi Classics", "Action Packed"].map((title, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl border border-orange-800/30 rounded-2xl p-8 cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                  <Play size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-400">{title}</h3>
                <p className="text-gray-400 mt-2">Explore {i === 0 ? "highest rated" : i === 1 ? "sci-fi gems" : "adrenaline rushes"}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;