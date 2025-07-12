import { Button } from "@/components/ui/button";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListingPage from "./pages/ItemListingPage";
import UserDashboard from "./pages/UserDashboard";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route
          path="/admin"
          element={true ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/landingpage"
          element={true ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/item"
          element={true ? <ItemListingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={true ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/"
          element={true ? <ProductDetailPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={true ? <ProductDetailPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
