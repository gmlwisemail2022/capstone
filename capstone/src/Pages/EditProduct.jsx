// EditProduct.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProduct({ match, history }) {
  const productId = match.params.productId;
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    category: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
    imageUrl5: "",
  });

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3100/edit/product/${productId}`,
        product
      );
      history.push(`/view/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Product details form fields */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProduct;
