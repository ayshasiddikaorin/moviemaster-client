import { Link, NavLink } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Remove TypeScript type annotations
  const navLinkClass = ({ isActive }) =>
    isActive 
      ? "text-orange-500 font-semibold" 
      : "text-gray-300 hover:text-white transition-colors duration-200";

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      {/* Main Navbar */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="text-2xl font-bold text-orange-600">
          <Link to="/" onClick={closeMenu}>MovieMaster</Link>
        </div>

        {/* Center: Desktop Links - Hidden on mobile */}
        <div className="hidden md:flex space-x-6 font-medium">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={navLinkClass}>
            All Movies
          </NavLink>
          <NavLink to="/add-movie" className={navLinkClass}>
            Add Movie
          </NavLink>
          <NavLink to="/my-collection" className={navLinkClass}>
            My Collection
          </NavLink>
        </div>

        {/* Right side: Search & Profile */}
        <div className="flex items-center space-x-4">
          {/* Search button - hidden on mobile, shown on tablet and up */}
          <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Search size={20} />
          </button>
          
          {/* Profile button */}
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <User size={20} />
          </button>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Shown only on mobile when menu is closed */}
      {!isMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu - Slides in from top */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slideDown">
          <div className="flex flex-col space-y-1 p-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-orange-600 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-orange-600 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={closeMenu}
            >
              All Movies
            </NavLink>
            <NavLink
              to="/add-movie"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-orange-600 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={closeMenu}
            >
              Add Movie
            </NavLink>
            <NavLink
              to="/my-collection"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-orange-600 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={closeMenu}
            >
              My Collection
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;