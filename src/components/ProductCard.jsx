import React from "react";

const ProductCard = ({
  product,
  onViewDetail,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-500">
      {/* Yêu thích */}
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-3 right-3 z-10 bg-white rounded-full shadow w-[40px] h-[40px] flex items-center justify-center hover:bg-red-100 transition"
        title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
      >
        <span
          className={`text-2xl ${
            isFavorite
              ? "text-red-500"
              : "text-gray-400 group-hover:text-red-400"
          }`}
        >
          ♥
        </span>
      </button>

      {/* Ảnh */}
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.shortDesc}
        </p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-orange-500 font-bold text-3xl">
            {product.price.toLocaleString("vi-VN")}₫
          </p>

          <button
            onClick={() => onViewDetail(product)}
            className="text-sm px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
