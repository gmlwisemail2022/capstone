import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ViewProduct(props) {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    //const productId = props.match.params.productId;
    fetchProduct(productId);
  }, []);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/view/product/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>View Product</h2>
      {product ? (
        <div>
          <h4>Product Name: {product.product_name}</h4>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          {product.images && product.images.length > 0 && (
            <div>
              <h4>Images:</h4>
              <Slider>
                {product.images.map((imageUrl, index) => (
                  <div key={index}>
                    <img src={imageUrl} alt={`Product ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewProduct;
