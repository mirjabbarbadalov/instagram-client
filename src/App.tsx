import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex gap-[200px]">
      <BrowserRouter>
        <Sidebar />
        <Routes>
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
