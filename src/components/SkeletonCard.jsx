import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-2xl shadow border border-gray-100 space-y-4">
      {/* Ảnh giả */}
      <div className="h-40 bg-gray-200 rounded-lg w-full" />

      {/* Tiêu đề */}
      <div className="h-4 bg-gray-200 rounded w-3/4" />

      {/* Mô tả ngắn */}
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />

      {/* Giá + nút */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-24 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
