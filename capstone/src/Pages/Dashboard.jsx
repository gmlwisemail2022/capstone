import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library for decoding JWT tokens

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("getting local storage token", token);

    // Check sessionStorage if token is not found in localStorage
    if (!token) {
      token = sessionStorage.getItem("token");
      console.log("getting session storage token", token);
    }

    // Check if token exists and is not expired
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, redirect to login page
        navigate("/login");
      } else {
        // Token is valid, set username from decoded token
        setUsername(decodedToken.username);
      }
    } else {
      // Token doesn't exist, redirect to login page
      //navigate("/login");
    }
  }, [navigate]);

  // Render the dashboard content here
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is Dashboard Page!</p>
      <div>
        <h2>Features</h2>
        <p>Here are the lists of features you can use:</p>
        <div style={{ textAlign: "left" }}>
          <h3>Header</h3>
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
              "catId", and optional "Product Images1" through "Product Images1"
            </li>
          </ul>
          <h3>
            Product Card features (available on List All, Search and Categories)
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
    </div>
  );
}
