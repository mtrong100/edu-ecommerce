import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 pt-10 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10">
        {/* Logo & giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3 tracking-wide">
            EduCommerce
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nền tảng giáo dục thương mại điện tử nơi bạn có thể tìm, lưu và khám
            phá các khoá học chất lượng phù hợp với bạn.
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Điều hướng
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 hover:underline transition"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-600 hover:underline transition"
              >
                Khoá học
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="hover:text-blue-600 hover:underline transition"
              >
                Yêu thích
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="hover:text-blue-600 hover:underline transition"
              >
                Lịch sử xem
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên hệ</h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>📧 support@educommerce.vn</li>
            <li>📞 1900 123 456</li>
            <li>🏢 TP.HCM, Việt Nam</li>
          </ul>
        </div>
      </div>

      {/* Line dưới cùng */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduCommerce. Thiết kế bởi Frostblade.
      </div>
    </footer>
  );
};

export default Footer;
