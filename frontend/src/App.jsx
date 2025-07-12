import { Button } from "@/components/ui/button"
import AdminPage from "./pages/AdminPage"
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
      {/* <Route path="/"element={authUser?<HomePage/>:<Navigate to ="/login"/>}/>
      <Route path="/signup"element={!authUser?<SignUpPage/>:<Navigate to ="/"/>}/>
      <Route path="/login"element={!authUser?<LoginPage/>:<Navigate to ="/"/>}/>
      <Route path="/settings"element={<SettingsPage/>}/>
      <Route path="/profile"element={authUser?<ProfilePage/>:<Navigate to ="/login"/>}/> */}
      <Route path="/admin"element={true?<AdminPage/>:<Navigate to ="/login"/>}/> 
      <Route path="/landingpage"element={true?<LandingPage/>:<Navigate to ="/login"/>}/> 
    </Routes>
    </div>
  );
}
export default App;
