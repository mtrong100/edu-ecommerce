import React from "react";

const ProductModal = ({ product, onClose, onToggleFavorite, isFavorite }) => {
  if (!product) return null;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const stars = "★".repeat(full) + "☆".repeat(5 - full);
    return <span className="text-yellow-500">{stars}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-auto overflow-y-auto p-6 relative animate-fadeIn">
        {/* Đóng modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-[40px] w-[40px] flex items-center justify-center bg-black rounded-full text-white hover:bg-red-500 text-xl"
          title="Đóng"
        >
          ✕
        </button>

        {/* Nội dung */}
        <div className="grid grid-cols-1 gap-6 ">
          {/* Ảnh */}
          <div className="w-full">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Nội dung mô tả */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mb-3">{product.longDesc}</p>

              {/* Giá & đánh giá */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-orange-600 font-bold text-3xl">
                  {product.price.toLocaleString("vi-VN")}₫
                </p>
                <div className="text-sm">
                  {renderStars(product.rating)}{" "}
                  <span className="text-gray-500 ml-1">
                    ({product.rating}/5)
                  </span>
                </div>
              </div>
            </div>

            {/* Nút yêu thích */}
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`mt-4 w-full py-2 rounded-full font-semibold transition text-white text-center shadow ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {isFavorite ? "💔 Bỏ yêu thích" : "❤️ Thêm vào yêu thích"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
