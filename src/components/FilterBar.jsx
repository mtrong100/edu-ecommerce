import React from "react";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedPriceRange,
  onPriceFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="🔍 Tìm kiếm khoá học..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Bộ lọc giá */}
      <select
        value={selectedPriceRange}
        onChange={(e) => onPriceFilter(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tất cả mức giá</option>
        <option value="low">Dưới 500K</option>
        <option value="mid">500K – 1 triệu</option>
        <option value="high">Trên 1 triệu</option>
      </select>
    </div>
  );
};

export default FilterBar;
