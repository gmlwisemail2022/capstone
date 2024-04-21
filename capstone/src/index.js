import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Pages/Header";
import Aside from "./Pages/Aside"; // Import the Aside component
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//import { Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <Aside />
          <App />
        </div>
      </div>
    </Router>
  </React.StrictMode>
);
