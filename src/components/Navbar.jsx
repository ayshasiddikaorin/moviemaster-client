// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
      closeMenu();
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-bold"
      : "text-gray-300 hover:text-orange-400 transition-colors duration-200";

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-orange-900/20 sticky top-0 z-50 shadow-2xl">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          <Link to="/" onClick={closeMenu}>MovieMaster</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/movies" className={navLinkClass}>All Movies</NavLink>
          <NavLink to="/add-movie" className={navLinkClass}>Add Movie</NavLink>
          <NavLink to="/my-collection" className={navLinkClass}>My Collection</NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search (Desktop) */}
          <button className="hidden md:block p-2 rounded-full bg-white/10 hover:bg-orange-500/20 transition-all">
            <Search size={20} className="text-orange-400" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="p-2 rounded-full bg-white/10 hover:bg-orange-500/20 transition-all">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                />
              ) : (
                <User size={20} className="text-orange-400" />
              )}
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-orange-800/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="p-3 border-b border-orange-800/30">
                <p className="text-sm text-orange-300 font-medium truncate">
                  {user?.displayName || "Guest"}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-orange-400 hover:bg-orange-500/20 transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-orange-400 hover:bg-orange-500/20 transition-colors"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-orange-500/20 transition-all"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={22} className="text-orange-400" /> : <Menu size={22} className="text-orange-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {!isMenuOpen && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-white/10 backdrop-blur-xl border border-orange-800/50 rounded-xl px-4 py-3 pl-11 text-white placeholder-orange-300 focus:outline-none focus:border-orange-500 transition-all"
            />
            <Search size={18} className="absolute left-4 top-3.5 text-orange-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-orange-800/50">
          <div className="flex flex-col p-4 space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/movies", label: "All Movies" },
              { to: "/add-movie", label: "Add Movie" },
              { to: "/my-collection", label: "My Collection" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-orange-400"
                  }`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;