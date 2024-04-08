import React, { useState } from "react";
import axios from "axios";

const Categories = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = async (category) => {
    try {
      const response = await axios.post(`http://localhost:3100/search`, null, {
        params: {
          type: "productName",
          value: category,
        },
      });
      if (response.data.length === 1 && response.data[0].message) {
        setSearchResults([]);
        setSearchMessage(`No product found`);
      } else {
        setSearchResults(response.data);
        if (response.data.length < 2) {
          setSearchMessage(`Search returned ${response.data.length} Result`);
        } else {
          setSearchMessage(`Search returned ${response.data.length} Results`);
        }
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => handleSearch("Switch")}
            className="btn btn-primary me-2"
          >
            Switch
          </button>
          <button
            onClick={() => handleSearch("PS4")}
            className="btn btn-primary me-2"
          >
            PS4
          </button>
          <button
            onClick={() => handleSearch("PS3")}
            className="btn btn-primary me-2"
          >
            PS3
          </button>
          <button
            onClick={() => handleSearch("Wii")}
            className="btn btn-primary me-2"
          >
            Wii/WiiU
          </button>
          <button
            onClick={() => handleSearch("3DS")}
            className="btn btn-primary me-2"
          >
            3DS
          </button>
          <button
            onClick={() => handleSearch("Vita")}
            className="btn btn-primary me-2"
          >
            PS Vita
          </button>
          <button
            onClick={() => handleSearch("Gaming Merch")}
            className="btn btn-primary me-2"
          >
            Gaming Merch
          </button>
          <button
            onClick={() => handleSearch("Collector")}
            className="btn btn-primary me-2"
          >
            Collector's
          </button>
        </div>
      </div>
      <div className="row mt-4">
        {/* Display search message */}
        {searchMessage && (
          <div className="col-md-12 mb-4">
            <p>{searchMessage}</p>
          </div>
        )}

        {/* Iterate over searchResults array and render product cards */}
        {searchResults.map((product) => (
          <div className="col-md-4 mb-4" key={product.product_id}>
            <div className="card h-100">
              <div style={{ height: "60%" }}>
                <img
                  src={product.image_url_1 || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt="Product Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                className="card-body"
                style={{ height: "100px", overflowY: "auto" }}
              >
                <h5 className="card-title">Product Name:</h5>
                <p className="card-text">{product.product_name}</p>
                <button className="btn btn-primary me-2">View</button>
                <button className="btn btn-success me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
