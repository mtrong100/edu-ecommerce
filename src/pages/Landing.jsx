import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../assets/image01.png";

const features = [
  {
    title: "🎯 Gợi ý thông minh",
    desc: "Hệ thống AI đề xuất khoá học dựa trên hành vi người dùng.",
  },
  {
    title: "🔍 Tìm kiếm & Lọc nhanh",
    desc: "Tìm khoá học theo tên, lọc theo mức giá trong vài giây.",
  },
  {
    title: "❤️ Yêu thích & Lịch sử",
    desc: "Dễ dàng lưu và xem lại khoá học bạn quan tâm.",
  },
  {
    title: "💻 Giao diện tối ưu",
    desc: "Thiết kế hiện đại, mượt mà, phù hợp desktop và mobile.",
  },
];

const steps = [
  "1️⃣ Đăng nhập hoặc duyệt danh sách khoá học.",
  "2️⃣ Tìm kiếm, lọc hoặc dùng gợi ý AI.",
  "3️⃣ Xem chi tiết, đánh dấu yêu thích.",
  "4️⃣ Bắt đầu học tập theo cách của bạn.",
];

const testimonials = [
  {
    name: "Nguyễn Minh Thư",
    text: "🌟 Giao diện rất dễ dùng, mình tìm thấy khoá học phù hợp chỉ trong 1 phút!",
  },
  {
    name: "Trần Đức Duy",
    text: "❤️ Tính năng gợi ý AI cực kỳ hữu ích. Mình không cần phải mò mẫm nữa.",
  },
  {
    name: "Lê Quỳnh Anh",
    text: "💬 Trang responsive rất tốt, dùng trên điện thoại cũng mượt mà!",
  },
];

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="min-h-[90vh] bg-gradient-to-br from-blue-100 to-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight max-w-4xl">
          Khám phá nền tảng giáo dục thương mại điện tử thông minh
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-6">
          Hàng chục khoá học chất lượng – Tìm kiếm nhanh – Gợi ý thông minh –
          Lưu trữ yêu thích
        </p>
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          🚀 Bắt đầu ngay
        </Link>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            🌟 Tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            📚 Về EduCommerce
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Chúng tôi mong muốn tạo ra một hệ sinh thái giáo dục mở – nơi mọi
            người có thể tìm thấy, chia sẻ và theo đuổi tri thức phù hợp với nhu
            cầu và tốc độ riêng của mình.
          </p>
          <img
            src={Image1}
            alt="Learning"
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Quy trình học */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🚀 Bắt đầu học tập như thế nào?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            {steps.map((step, i) => (
              <li
                key={i}
                className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-500 text-left"
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Đánh giá người dùng */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            💬 Người dùng nói gì?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded shadow">
                <p className="text-gray-700 italic">"{t.text}"</p>
                <p className="mt-4 text-sm font-semibold text-blue-600">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình học tập?
        </h2>
        <p className="text-lg mb-6">
          Khám phá ngay hàng chục khoá học chất lượng phù hợp với bạn.
        </p>
        <Link
          to="/courses"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          🎓 Xem khoá học
        </Link>
      </section>
    </div>
  );
};

export default Landing;
