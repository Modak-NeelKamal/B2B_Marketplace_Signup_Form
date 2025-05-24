import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuyerSignup from './pages/BuyerSignup';
import SellerSignup from './pages/SellerSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyer-signup" element={<BuyerSignup />} />
        <Route path="/seller-signup" element={<SellerSignup />} />
      </Routes>
    </Router>
  );
}

export default App;