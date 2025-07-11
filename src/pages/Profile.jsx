import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (!data) {
      toast.error("Bạn chưa đăng nhập");
      navigate("/login");
    } else {
      const user = JSON.parse(data);
      setForm({
        email: user.email,
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...form };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    toast.success("Cập nhật thông tin thành công 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          👤 Hồ sơ cá nhân
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={form.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Họ và tên</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Số điện thoại</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
              placeholder="0123456789"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Địa chỉ</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-blue-300"
              placeholder="123 Đường ABC, Quận 1, TP.HCM"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold transition"
          >
            💾 Cập nhật thông tin
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
        >
          🔓 Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
