import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Pages/Header";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Upload from "./Pages/Upload";
import About from "./Pages/About";
import "./App.css";
import ListAll from "./Pages/ListAll";
import SearchProduct from "./Pages/SearchProduct";
import AddProduct from "./Pages/AddProduct";
import WhatsNew from "./Pages/WhatsNew";
import Calendar from "./Pages/Calendar";

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
            <Route path="/listall" element={<ListAll />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/whatsnew" element={<WhatsNew />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
