// ListAll.jsx and SearchProduct.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListAll() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3100/listAll?page=${currentPage}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="col-md-10">
      <div className="container mt-4">
        <div className="d-flex justify-content-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="btn btn-primary me-2"
          >
            Previous Page
          </button>
          <button onClick={handleNextPage} className="btn btn-primary">
            Next Page
          </button>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.product_id}>
              <div className="card">
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={
                      product.image_url_1 || "https://via.placeholder.com/300"
                    }
                    className="card-img-top"
                    alt="Product Image"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body" style={{ height: "250px" }}>
                  <h5 className="card-title">Product Name:</h5>
                  <p className="card-text">{product.product_name}</p>
                  <h5 className="card-title">Category:</h5>
                  <p className="card-text">{product.category}</p>
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
                  <Link
                    to={`/delete/product/${product.product_id}`}
                    className="btn btn-danger"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListAll;
