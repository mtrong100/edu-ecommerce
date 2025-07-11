import React, { useState } from "react";
import { saveUser } from "../utils/authUtils";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = saveUser(form);
    if (success) {
      toast.success("Tạo tài khoản thành công 🎉");
      navigate("/login");
    } else {
      toast.error("Email đã tồn tại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📝 Đăng ký tài khoản
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
