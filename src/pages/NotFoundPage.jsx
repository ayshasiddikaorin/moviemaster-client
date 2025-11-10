import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Page not found...";

  // Mouse move effect
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center px-4">
      {/* Mouse-follow gradient */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, #f97316 0%, transparent 60%)`,
          transition: "background 0.4s ease",
        }}
      />

      {/* Floating Sparks */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Glass Card */}
      <div
        className="relative z-10 max-w-md w-full p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-orange-500/30 shadow-2xl text-center"
        style={{
          boxShadow: "0 8px 32px rgba(249, 115, 22, 0.2)",
        }}
      >
        {/* Neon 404 */}
        <div className="relative mb-6">
          <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-2xl animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-orange-600 blur-3xl opacity-50 animate-pulse">
            404
          </div>
        </div>

        {/* Typewriter */}
        <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">
          {typedText}
          <span className="inline-block w-1 h-6 bg-orange-400 ml-1 animate-pulse" />
        </h2>
        <p className="text-orange-300 text-sm mb-8">
          This page has disappeared into the cinematic void.
        </p>

        {/* Buttons */}
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
            Home
          </Link>
        </div>

        {/* Spinning Reel */}
        <div className="mt-10 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-orange-600 rounded-full animate-spin-slow flex items-center justify-center shadow-xl">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-3xl text-orange-500">Film</span>
              </div>
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-300 rounded-full animate-ping" />
          </div>
        </div>

        {/* Footer */}
        <p className="text-orange-500 text-xs mt-8">
          © 2025 <span className="font-bold">MovieMaster Pro</span> • Made with{" "}
          <span className="text-red-500">Heart</span> in Dhaka
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;