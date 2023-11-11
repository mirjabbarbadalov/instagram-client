import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/favourites" />
        <Route path="/messages" />
        <Route path="/notifications" />
        <Route path="/profile" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
