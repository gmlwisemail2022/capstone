import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Search() {
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:3100/search`, null, {
        params: {
          type: searchType,
          value: searchValue,
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

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3100/delete/product/${productId}`);
      // Refresh search results after deletion
      handleSearch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select mb-2"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">Select search type</option>
            <option value="productName">Product Name</option>
            <option value="externalId">External ID</option>
            <option value="productId">Product ID</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
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
                <Link
                  to={`/view/product/${product.product_id}`}
                  className="btn btn-primary me-2"
                >
                  View
                </Link>
                <Link
                  to={`/edit/product/${product.product_id}`}
                  className="btn btn-success me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.product_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
