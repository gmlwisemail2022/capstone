import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    const usernameParam = queryParams.get("username");

    if (tokenParam && usernameParam) {
      localStorage.setItem("token", tokenParam);
      localStorage.setItem("username", usernameParam);
      setToken(tokenParam); // Set token state
      setUsername(usernameParam); // Set username state
      navigate("/dashboard");
      window.location.reload(); // Refresh the page for successful google login
    } else {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (storedToken && storedUsername) {
        setToken(storedToken);
        setUsername(storedUsername);
      } else {
        navigate("/login");
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return (
    <div>
      <header>
        <h1>Welcome, {username}!</h1>
      </header>
      <main>
        <div>
          <h2> </h2>
          <p>Here are the lists of features you can use:</p>
          <div style={{ textAlign: "left" }}>
            <h3>Navigation Bar</h3>
            <ul>
              <li>About - Detailed Application Information</li>
              <li>What's New - Latest feature added to the application</li>
              <li>
                Calendar - Built-in Calendar feature with Note Taking feature!
                (under construction)
              </li>
            </ul>
            <h3>Side Column</h3>
            <ul>
              <li>
                List All - Lists All products saved in the database. Each page
                contains up to 30 products
              </li>
              <li>Categories - List products by pre-set categories</li>
              <li>
                Search - Search products via product name, external / 3rd party
                app id, or product id
              </li>
              <li>Add Product - Manually add a new product</li>
              <li>
                Upload - Upload a csv file. File must contain at least these
                columns: "Product ID", "Product Name", "Main Description",
                "catId", and optional "Product Images1" through "Product
                Images1"
              </li>
            </ul>
            <h3>
              Product Card features (available on List All, Search and
              Categories)
            </h3>
            <ul>
              <li>View - View the complete detail of a product</li>
              <li>Edit - Edit product detail </li>
              <li>Delete - Delete a product</li>
            </ul>
            <h3>Upcoming features</h3>
            <ul>
              <li>Mass Upload for orders and inventories</li>
              <li>Sync inventories from 3rd party apps and own database</li>
              <li>View and Edit Stocks</li>
              <li>View and Edit Costing and Pricing</li>
            </ul>
          </div>
        </div>
      </main>
      <footer>
        <p>Last Updated: April 2024</p>
      </footer>
    </div>
  );
}
