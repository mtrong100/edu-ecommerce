import React, { useEffect, useState } from "react";
import { getCart, setCart } from "../utils/localStorageUtils";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    setCart(updated);
    toast.success("Đã xoá khỏi giỏ hàng");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = total - (total * discount) / 100;

  const handleApplyDiscount = () => {
    if (discountCode === "GIAM10") {
      setDiscount(10);
      toast.success("Đã áp dụng mã giảm giá 10%");
    } else if (discountCode === "GIAM20") {
      setDiscount(20);
      toast.success("Đã áp dụng mã giảm giá 20%");
    } else {
      setDiscount(0);
      toast.error("Mã giảm giá không hợp lệ");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 ">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center">
        🛒 Giỏ hàng của bạn
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <img
            src="/assets/empty_cart.png"
            alt="empty"
            className="w-40 mx-auto mb-6 opacity-80"
          />
          <p className="text-lg mb-4">Chưa có khoá học nào trong giỏ hàng.</p>
          <Link
            to="/courses"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            🚀 Tiếp tục khám phá
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* DANH SÁCH SẢN PHẨM */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-lg border border-gray-100 transition"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-orange-600 font-bold">
                    {item.price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                  title="Xoá"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* THANH TOÁN */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-5 sticky top-24 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Thanh toán
            </h2>

            {/* Mã giảm giá */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ring-blue-300"
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
              >
                Áp dụng
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Mã: <code>GIAM10</code> hoặc <code>GIAM20</code>
            </p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium text-sm">
                <span>Giảm giá ({discount}%)</span>
                <span>
                  -{((total * discount) / 100).toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Thành tiền:</span>
              <span>{discountedTotal.toLocaleString("vi-VN")}₫</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-full font-semibold transition mt-2"
            >
              ✅ Tiến hành thanh toán
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
