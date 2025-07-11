import React, { useState } from "react";
import { authenticate } from "../utils/authUtils";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = authenticate(form.email, form.password);
    if (user) {
      toast.success("Đăng nhập thành công ✅");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } else {
      toast.error("Email hoặc mật khẩu sai");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔐 Đăng nhập
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
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="mt-2 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
