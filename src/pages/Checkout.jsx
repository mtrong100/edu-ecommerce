import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
  });

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin người mua");
      return;
    }

    if (paymentMethod === "online") {
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry) {
        toast.error("Vui lòng nhập đầy đủ thông tin thẻ");
        return;
      }
      toast.success("💳 Thanh toán online thành công!");
    } else {
      toast.success("💵 Đặt hàng thành công (COD)!");
    }

    // Reset
    setCartItems([]);
    localStorage.setItem("cart", "[]");
    setTimeout(() => navigate("/courses"), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
        🧾 Thanh toán khoá học
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <img
            src="/assets/empty_checkout.png"
            alt="empty"
            className="w-40 mx-auto mb-6 opacity-80"
          />
          <p className="text-lg mb-4">Không có khoá học nào trong giỏ hàng.</p>
          <button
            onClick={() => navigate("/courses")}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            🔍 Quay lại khoá học
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Form người dùng */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Thông tin người học
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
                placeholder="abc@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-blue-400"
                placeholder="0123456789"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">
                Phương thức thanh toán
              </h3>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💵 Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Thanh toán Online </span>
              </label>
            </div>

            {paymentMethod === "online" && (
              <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-lg border">
                <input
                  type="text"
                  placeholder="Số thẻ (1111 2222 3333 4444)"
                  value={cardInfo.number}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, number: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:ring-2 ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Tên chủ thẻ"
                  value={cardInfo.name}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:ring-2 ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Ngày hết hạn (MM/YY)"
                  value={cardInfo.expiry}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expiry: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:ring-2 ring-blue-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold text-lg transition"
            >
              ✅ Xác nhận thanh toán
            </button>
          </div>

          {/* Tổng quan đơn hàng */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Khoá học đã chọn
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-orange-500 font-bold text-sm">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr />

            <div className="flex justify-between text-gray-700">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Thành tiền:</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
