import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={} />
        <Route path="/feed" element={} />
        <Route path="/favourites" element={} />
        <Route path="/messages" element={} />
        <Route path="/notifications" element={} />
        <Route path="/profile" element={} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
