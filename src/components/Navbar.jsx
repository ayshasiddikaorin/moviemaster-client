import { Link, NavLink } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side: Logo */}
      <div className="text-2xl font-bold text-orange-600">
        <Link to="/">MovieMaster</Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-6 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          All Movies
        </NavLink>
        <NavLink
          to="/add-movie"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Add Movie
        </NavLink>
        <NavLink
          to="/my-collection"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          My Collection
        </NavLink>
      </div>

      {/* Right side: Search & Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-700">
          <Search size={20} />
        </button>
        <button className="p-2 rounded hover:bg-gray-700">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
