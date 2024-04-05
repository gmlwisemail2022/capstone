import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
//import { BiPlusCircle } from "react-icons/fa";

function Header() {
  const token = localStorage.getItem("token");

  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            eCommerce Inventory Management
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
              <Logout />
            ) : (
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Aside */}
      <aside className="col-2 bg-light">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="/listAll">
              <i className="bi bi-list-ul me-2"></i>List All
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/listAll">
              <i className="bi bi-list-ul me-2"></i>Categories
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">
              <i className="bi bi-search me-2"></i>Search
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add">
              <i className="bi bi-plus-circle me-2"></i>Add Product
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/upload">
              <i className="bi bi-plus-circle me-2"></i>Upload
            </a>
          </li>
        </ul>
      </aside>
    </header>
  );
}

export default Header;
