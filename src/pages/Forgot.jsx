import React, { useState } from "react";
import { resetPassword } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Forgot = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    const success = resetPassword(email, newPass);
    if (success) {
      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } else {
      toast.error("Email không tồn tại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔁 Khôi phục mật khẩu
        </h2>
        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 ring-blue-400 mb-4"
            />
            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              Gửi mã xác nhận
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 ring-blue-400 mb-4"
            />
            <button
              onClick={handleReset}
              className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
            >
              Cập nhật mật khẩu
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Forgot;
