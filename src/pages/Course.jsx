import React, { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import FilterBar from "../components/FilterBar";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";
import { addToHistory } from "../utils/localStorageUtils";

const Courses = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(getLocal("favorites") || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleSuggest = () => {
    setSuggestionLoading(true);
    setSuggestions([]); // clear cũ để đảm bảo render skeleton

    setTimeout(() => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
      setSuggestionLoading(false);
      toast.success("Đã gợi ý 3 khoá học phù hợp 🎯");
    }, 800); // giả loading 0.8s
  };

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

  const handleViewDetail = (product) => {
    setSelectedProduct(product);

    // ✅ Lưu lịch sử xem
    addToHistory(product);
  };

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => {
      if (priceFilter === "low") return p.price < 500000;
      if (priceFilter === "mid") return p.price >= 500000 && p.price <= 1000000;
      if (priceFilter === "high") return p.price > 1000000;
      return true;
    });

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Tiêu đề đẹp */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          🎓 Khoá học nổi bật
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Chọn khoá học phù hợp với bạn ngay hôm nay.
        </p>
      </div>

      {/* Bộ lọc */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPriceRange={priceFilter}
        onPriceFilter={setPriceFilter}
      />

      <div className="flex justify-end mb-6">
        <button
          onClick={handleSuggest}
          className="px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          🎯 Gợi ý khoá học
        </button>
      </div>

      {(suggestionLoading || suggestions.length > 0) && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔍 Gợi ý cho bạn
          </h2>

          {suggestionLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 border-b-4 border-b-blue-300 pb-8">
              {suggestions.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={handleViewDetail}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Danh sách */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p>Không tìm thấy khoá học phù hợp 😢</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={handleViewDetail}
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

export default Courses;
