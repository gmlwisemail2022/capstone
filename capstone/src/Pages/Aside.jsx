import React, { useEffect, useState } from "react";

const Aside = () => {
  // State variable to store the token
  const [token, setToken] = useState("");

  // Effect hook to update the component when the token changes
  useEffect(() => {
    // Check if token is present in local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array to run the effect only once when component mounts
  return (
    <aside className="col-md-2 bg-light">
      <ul className="nav flex-column">
        {token && ( // Only render the links if token is present
          <>
            <li className="nav-item">
              <a className="nav-link" href="/listAll">
                <i className="bi bi-list-ul me-2"></i>List All
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categories">
                <i className="bi bi-list-ul me-2"></i>Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">
                <i className="bi bi-search me-2"></i>Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add/product">
                <i className="bi bi-plus-circle me-2"></i>Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/upload">
                <i className="bi bi-plus-circle me-2"></i>Upload
              </a>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
