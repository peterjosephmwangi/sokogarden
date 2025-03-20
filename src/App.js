import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddLand from "./components/AddLand";
import GetLandDetails from "./components/GetLandDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import MakePayment from "./components/MakePayment";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get current route

  const showNavbar = ["/", "/add-product", "/makepayment"].includes(location.pathname); // Show Navbar on these pages
  const showFooter = ["/", "/add-product"].includes(location.pathname); // Show Footer only on Home & Add Product
  const showCarousel = location.pathname === "/"; // Show Carousel only on Home page

  return (
    <div>
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}

      {/* Show Carousel only on Home Page */}
      {showCarousel && <Carousel />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/add-product" element={<AddLand />} />
        <Route path="/makepayment" element={<MakePayment />} />
        <Route path="/" element={<GetLandDetails />} />
      </Routes>

      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
