import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="col-md-4 mb-4" key={product.product_id}>
      <div className="card h-100">
        <div style={{ height: "60%" }}>
          <img
            src={product.image_url_1 || "https://via.placeholder.com/300"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="card-body"
          style={{ height: "80px", overflowY: "auto" }}
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
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
