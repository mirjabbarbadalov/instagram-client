import Cookies from "js-cookie";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Favourites from "./pages/Favourites/Favourites";
import Friend from "./pages/Friend/Friend";
import Home from "./pages/Home/Home";
import { Chat } from "./pages/Messages/Chat";
import Messages from "./pages/Messages/Messages";
import More from "./pages/More/More";
import Notifications from "./pages/Notifications/Notifications";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();

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
    <div className="flex gap-[30px]">
      {shouldShowSidebar() && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/messages" element={<Chat />} />
        <Route path="/chats/:chatter" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/friend/:username" element={<Friend />} />
        <Route path="/more/*" element={<More />} />
      </Routes>
    </div>
  );
}

export default App;
