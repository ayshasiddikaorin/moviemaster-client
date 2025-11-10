import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="flex-grow relative min-h-screen bg-black text-white overflow-hidden px-4 py-12">
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
        className="relative z-10 max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-orange-500/30 rounded-3xl p-10 shadow-2xl flex flex-col gap-8"
      >
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
            About MovieMaster Pro
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Welcome to <span className="text-orange-400 font-semibold">MovieMaster Pro</span> —
            your ultimate platform for discovering, managing, and enjoying your favorite movies.
            Explore new releases, build your personal collection, and stay updated with top-rated films.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-orange-500/30 p-5 rounded-2xl text-center hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">Discover Movies</h2>
            <p className="text-gray-300 text-sm">
              Browse a large collection of movies with detailed info, ratings, and reviews.
            </p>
          </div>

          <div className="bg-white/10 border border-orange-500/30 p-5 rounded-2xl text-center hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">Manage Your Collection</h2>
            <p className="text-gray-300 text-sm">
              Add movies to your personal collection and track what you’ve watched.
            </p>
          </div>

          <div className="bg-white/10 border border-orange-500/30 p-5 rounded-2xl text-center hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">Top Ratings</h2>
            <p className="text-gray-300 text-sm">
              See the top-rated movies loved by the community.
            </p>
          </div>

          <div className="bg-white/10 border border-orange-500/30 p-5 rounded-2xl text-center hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">Watchlist</h2>
            <p className="text-gray-300 text-sm">
              Save movies to watch later and get notified about new releases.
            </p>
          </div>
        </div>

        {/* Developer Info */}
        <div className="text-center text-gray-400 mt-4">
          <p>
            Developed with <span className="text-red-500 font-semibold">❤️</span> by <span className="text-orange-400 font-semibold">MST Aysha Siddika</span>
          </p>
          <p className="text-sm mt-1">
            © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
