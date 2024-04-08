import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProduct(props) {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/view/product/${productId}`
      );
      setProduct(response.data[0]); // Since the response is an array, select the first item
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>View Product</h2>
      {product && (
        <div>
          {/* Display up to 5 images */}
          <div className="images-container">
            {product.image_url_1 && (
              <img
                src={product.image_url_1}
                alt="Product Image 1"
                style={{ maxWidth: "20%", marginRight: "5px" }} // Limit the size of the image relative to VW
              />
            )}
            {product.image_url_2 && (
              <img
                src={product.image_url_2}
                alt="Product Image 2"
                style={{ maxWidth: "20%", marginRight: "5px" }} // Limit the size of the image relative to VW
              />
            )}
            {product.image_url_3 && (
              <img
                src={product.image_url_3}
                alt="Product Image 3"
                style={{ maxWidth: "20%", marginRight: "5px" }} // Limit the size of the image relative to VW
              />
            )}
            {product.image_url_4 && (
              <img
                src={product.image_url_4}
                alt="Product Image 4"
                style={{ maxWidth: "20%", marginRight: "5px" }} // Limit the size of the image relative to VW
              />
            )}
            {product.image_url_5 && (
              <img
                src={product.image_url_5}
                alt="Product Image 5"
                style={{ maxWidth: "20%", marginRight: "5px" }} // Limit the size of the image relative to VW
              />
            )}
          </div>
          <div>
            <h4>Product Name: {product.product_name}</h4>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>External ID: {product.external_id}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
