import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import ProductModal from "../components/ProductModal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState(getLocal("favorites") || []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const filtered = productsData.filter((p) => favorites.includes(p.id));
    setProducts(filtered);
  }, [favorites]);

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

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500">
          ❤️ Danh sách yêu thích
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Các khoá học bạn đã đánh dấu yêu thích sẽ hiển thị tại đây.
        </p>
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="empty"
            className="w-32 mx-auto mb-6 opacity-70"
          />
          <p className="text-lg">Bạn chưa thêm khoá học nào vào yêu thích 😢</p>
          <Link
            to="/courses"
            className="inline-block mt-6 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            🚀 Khám phá khoá học
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={setSelectedProduct}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true}
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

export default Favorites;
