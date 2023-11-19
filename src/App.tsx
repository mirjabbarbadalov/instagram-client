import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "../src/pages/Authentication/loginPage/LoginPage";
import RegisterPage from "../src/pages/Authentication/registerPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const shouldShowSidebar = () => {
    return !["/login", "/register"].includes(location.pathname);
  };

  return (
    <div className="flex gap-[200px]">
      {shouldShowSidebar() && <Sidebar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/favourites" />
        <Route path="/messages" />
        <Route path="/notifications" />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
