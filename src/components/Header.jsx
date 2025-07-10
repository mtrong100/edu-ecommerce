import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Khoá học", to: "/courses" },
    { label: "Yêu thích", to: "/favorites" },
    { label: "Lịch sử xem", to: "/history" },
  ];

  const isActive = (path) =>
    pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
          EduCommerce
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className={`${isActive(
                link.to
              )} hover:text-blue-500 transition font-semibold`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600 transition"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`${isActive(
                  link.to
                )} hover:text-blue-500 transition text-sm`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
