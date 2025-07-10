import React from "react";

const SuggestionButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded shadow disabled:opacity-50"
    >
      {loading ? "Đang lấy gợi ý..." : "🎯 Gợi ý sản phẩm phù hợp"}
    </button>
  );
};

export default SuggestionButton;
