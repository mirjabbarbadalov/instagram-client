import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Favourites from "./pages/Favourites/Favourites";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import More from "./pages/More/More";
import EditProfile from "./pages/Profile/EditProfile";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = !!Cookies.get("token");
    console.log("Is Logged In:", isLoggedIn);
    console.log("Current Path:", location.pathname);
  }, [location.pathname]);

  const isLoggedIn = !!Cookies.get("token");

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const shouldShowSidebar = () => {
    return !["/login", "/register"].includes(location.pathname);
  };

  return (
    <div className="flex gap-[200px]">
      {shouldShowSidebar() && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </div>
  );
}

export default App;
