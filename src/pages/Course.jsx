import React, { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import FilterBar from "../components/FilterBar";
import toast from "react-hot-toast";

const Courses = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(getLocal("favorites") || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(productsData);
  }, []);

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
