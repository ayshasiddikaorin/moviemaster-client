import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Oops! Page not found...";

  // Mouse move for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center px-4">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #ea580c 0%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Card with Glassmorphism + 3D Tilt */}
      <div
        className="relative z-10 max-w-lg w-full p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-orange-500/20 shadow-2xl"
        style={{
          transform: `perspective(1000px) rotateY(${(mousePos.x - 50) * 0.2}deg) rotateX(${(50 - mousePos.y) * 0.2}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* 404 with Neon Glow */}
        <div className="text-center mb-6">
          <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-2xl animate-pulse">
            404
          </h1>
          <div className="text-8xl sm:text-9xl font-black text-orange-600 absolute inset-0 blur-3xl opacity-40 animate-pulse">
            404
          </div>
        </div>

        {/* Typewriter Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
          <p className="text-orange-300 text-sm">
            This page has vanished into the void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="px-6 py-3 bg-transparent border-2 border-orange-500 text-orange-400 font-bold rounded-xl hover:bg-orange-500/20 transition-all transform hover:scale-105 shadow-lg"
          >
            Home Page
          </Link>
        </div>

        {/* Fun Movie Reel */}
        <div className="mt-10 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-orange-600 rounded-full animate-spin-slow flex items-center justify-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-3xl text-orange-500">Film</span>
              </div>
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-orange-500 text-xs mt-8">
          © 2025 <span className="font-bold">MovieMaster Pro</span> • Made with{" "}
          <span className="text-red-500">Heart</span> in Dhaka
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;