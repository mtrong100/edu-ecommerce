import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Khoá học", to: "/courses" },
    { label: "Yêu thích", to: "/favorites" },
    { label: "Lịch sử xem", to: "/history" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);

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
              className="text-sm hover:text-blue-600 text-gray-700 transition"
            >
              {link.label}
            </Link>
          ))}

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative text-2xl hover:text-blue-600 transition"
                title="Giỏ hàng"
              >
                🛒
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="text-sm bg-gray-200 text-gray-800 p-3 rounded-full hover:bg-gray-300 transition"
              >
                👤 Cá nhân
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
            >
              Đăng nhập
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-sm hover:text-blue-600 text-gray-700 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="text-sm hover:text-blue-600 flex items-center gap-2"
            >
              🛒 Giỏ hàng
              {cartItems.length > 0 && (
                <span className="text-xs bg-red-500 text-white px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
