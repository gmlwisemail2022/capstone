import React from "react";

const Aside = () => {
  return (
    <aside className="col-md-2 bg-light">
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
  );
};

export default Aside;
