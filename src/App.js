import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddLand from "./components/AddLand";
import GetLandDetails from "./components/GetLandDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get current location

  return (
    <div>
      {/* Conditionally render Navbar based on the current route */}
      {(location.pathname === "/add-product" ||
        location.pathname === "/get_product_details") && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/add-product" element={<AddLand />} />
        <Route path="/get_product_details" element={<GetLandDetails />} />
      </Routes>
    </div>
  );
}

export default App;
