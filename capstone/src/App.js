import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Upload from "./Pages/Upload";
import About from "./Pages/About";
import "./App.css";
import ListAll from "./Pages/ListAll";
import SearchProduct from "./Pages/SearchProduct";
import ViewProduct from "./Pages/ViewProduct";
import EditProduct from "./Pages/EditProduct";
import DeleteProduct from "./Pages/DeleteProduct";
import AddProduct from "./Pages/AddProduct";
import WhatsNew from "./Pages/WhatsNew";
import Calendar from "./Pages/Calendar";

function App() {
  return (
    <div className="col-md-10">
      <div className={"App text-center"}>
        <div className="layout">
          <div className="nav"></div>
          <div className="main-content mt-20 md:w-1/2 md:mx-auto w-full">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/listall" element={<ListAll />} />
              <Route path="/search" element={<SearchProduct />} />
              <Route
                path="/view/product/:productId"
                element={<ViewProduct />}
              />
              <Route
                path="/edit/product/:productId"
                element={<EditProduct />}
              />
              <Route
                path="/delete/product/:productId"
                element={<DeleteProduct />}
              />
              <Route path="/add/product" element={<AddProduct />} />
              <Route path="/about" element={<About />} />
              <Route path="/whatsnew" element={<WhatsNew />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
