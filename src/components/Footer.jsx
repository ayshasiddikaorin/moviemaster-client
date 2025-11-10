const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-orange-500 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">MovieMaster Pro</h3>
            <p className="text-sm text-orange-400">
              Your ultimate movie companion. Organize, discover, and enjoy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-orange-300 transition">Home</a></li>
              <li><a href="/movies" className="hover:text-orange-300 transition">All Movies</a></li>
              <li><a href="/about" className="hover:text-orange-300 transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Genres</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Action", "Drama", "Comedy", "Sci-Fi", "Horror"].map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-orange-900/30 rounded-full hover:bg-orange-600 transition cursor-pointer"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Follow Us with Real Logos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition transform hover:scale-110"
                aria-label="Facebook"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/32/5968/5968764.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition transform hover:scale-110"
                aria-label="X"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/32/5969/5969020.png"
                  alt="X"
                  className="w-5 h-5"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition transform hover:scale-110"
                aria-label="Instagram"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/32/5968/5968814.png"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-orange-800 mt-8 pt-6 text-center text-sm">
          <p>
            © {currentYear} <span className="font-bold">MovieMaster Pro</span>. All rights reserved.
          </p>
          <p className="text-orange-400 mt-1">
            Made with <span className="text-red-500">Heart</span> in Dhaka
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;