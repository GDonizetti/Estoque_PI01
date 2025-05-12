import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StockMain from "./pages/StockMain";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/stockmain" element={<StockMain />} />
    </Routes>
  );
}

export default App;
