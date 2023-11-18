import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import LoginPage from "./pages/Authentication/loginPage/LoginPage.tsx";
import RegisterPage from "./pages/Authentication/registerPage/RegisterPage.tsx";

function App() {
  return (
    <div className="flex gap-[200px]">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Home />} />
          <Route path="/favourites" />
          <Route path="/messages" />
          <Route path="/notifications" />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
