import { Navigate, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Home focusSection="products" />} />
      <Route path="/quality" element={<Home focusSection="quality" />} />
      <Route path="/contact" element={<Home focusSection="contact" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
