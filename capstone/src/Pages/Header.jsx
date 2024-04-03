import React from "react";

function Header() {
  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            eCommerce Inventory Management
          </a>
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
                <a className="nav-link" href="/home">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Aside */}
      <aside className="col-2 bg-light">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="/listAll">
              List All
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">
              Search
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add">
              Add Product
            </a>
          </li>
        </ul>
      </aside>
    </header>
  );
}

export default Header;
