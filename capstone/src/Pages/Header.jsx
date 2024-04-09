import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Clock from "./Clock";

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/eCIM Logo.png"
            alt="eCommerce Inventory Management"
            width="150"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/whatsnew">
                What's New?
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">
                Calendar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {token ? (
            <>
              <Clock /> {/* Add the Clock component */}
              <Logout />
            </>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
