import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import History from "./pages/History";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Chatbot from "./components/Chatbot";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
