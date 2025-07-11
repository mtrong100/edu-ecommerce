import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);

  const [favorites, setFavorites] = useState(getLocal("favorites") || []);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleToggleFavorite = (productId) => {
    let updated;
    if (favorites.includes(productId)) {
      updated = favorites.filter((id) => id !== productId);
      toast.error("Đã xoá khỏi yêu thích");
    } else {
      updated = [...favorites, productId];
      toast.success("Đã thêm vào yêu thích");
    }
    setFavorites(updated);
    setLocal("favorites", updated);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("viewedHistory")) || [];
    setHistory(data);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          👀 Lịch sử xem
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Danh sách các khoá học bạn đã từng xem gần đây.
        </p>
      </div>

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg">Bạn chưa xem khoá học nào gần đây 😶</p>
          <Link
            to="/courses"
            className="inline-block mt-6 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            🚀 Khám phá khoá học
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {history.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
      )}

      {/* Modal xem chi tiết */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct && favorites.includes(selectedProduct.id)}
      />
    </div>
  );
};

export default History;
