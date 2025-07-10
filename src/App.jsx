import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import History from "./pages/History";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";

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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
