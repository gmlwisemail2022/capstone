import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header";
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
    <div className={"App text-center "}>
      <div className="layout">
        <div className="nav">
          <Header />
        </div>
        <div className="main-content mt-20 md:w-1/2 md:mx-auto w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/listall" element={<ListAll />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
