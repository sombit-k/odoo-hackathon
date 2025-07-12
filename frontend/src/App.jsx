import { Button } from "@/components/ui/button";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListingPage from "./pages/ItemListingPage";
import UserDashboard from "./pages/UserDashboard";
import ProductDetailPage from "./pages/ProductDetailPage";
import StoreTest from "./components/StoreTest";

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
        <Route
          path="/store-test"
          element={<StoreTest />}
        />
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
