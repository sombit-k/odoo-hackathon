import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListingPage from "./pages/ItemListingPage";
import UserDashboard from "./pages/UserDashboard";
import ProductDetailPage from "./pages/ProductDetailPage";
import StoreTest from "./components/StoreTest";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuthStore from "./store/useAuthStore";

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/item"
          element={isAuthenticated ? <ItemListingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/product"
          element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />}
        />
        <Route path="/store-test" element={<StoreTest />} />
      </Routes>
    </div>
  );
}

export default App;
// frontend/src/App.jsx

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignOutButton,
// } from "@clerk/clerk-react";
// import SaveUserOnLogin from "./SaveUserOnLogin";

// function App() {
//   return (
//     <div>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>

//       <SignedIn>
//         <h1>Welcome, you’re signed in!</h1>
//         <SaveUserOnLogin />
//         <SignOutButton />
//       </SignedIn>
//     </div>
//   );
// }

// export default App;
