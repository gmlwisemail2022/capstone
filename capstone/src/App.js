import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import "./App.css";
import ListAll from "./Pages/ListAll";
import SearchProduct from "./Pages/SearchProduct";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/listall" element={<ListAll />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
