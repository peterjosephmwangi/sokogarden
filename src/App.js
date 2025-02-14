import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddLand from "./components/AddLand";
import GetLandDetails from "./components/GetLandDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get current location

  const showHeaderFooter = location.pathname === "/add-product" || location.pathname === "/";

  return (
    <div>
      {/* Conditionally render Navbar */}
      {showHeaderFooter && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/add-product" element={<AddLand />} />
        <Route path="/" element={<GetLandDetails />} />
      </Routes>

      {/* Conditionally render Footer */}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
