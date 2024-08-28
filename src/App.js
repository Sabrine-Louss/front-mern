import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;