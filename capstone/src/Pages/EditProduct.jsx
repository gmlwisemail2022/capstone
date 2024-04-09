import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    category: "",
    image_url_1: "",
    image_url_2: "",
    image_url_3: "",
    image_url_4: "",
    image_url_5: "",
  });
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/view/product/${productId}`
      );
      setProduct(response.data[0]); // Since the response is an array, select the first item
      setFormData(response.data[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3100/edit/product/${productId}`,
        formData
      );
      // Redirect to ViewProduct page after successful update
      navigate(`/view/product/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      {product && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select category</option>
              <option value="Switch">Switch</option>
              <option value="PS4">PS4</option>
              <option value="PS3">PS3</option>
              <option value="Wii">Wii</option>
              <option value="Wii U">Wii U</option>
              <option value="3DS">3DS</option>
              <option value="DS">DS</option>
              <option value="Vita">Vita</option>
              <option value="Gaming Merch">Gaming Merch</option>
              <option value="Collector's">Collector's</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image URLs:</label>
            {/* Display image previews for existing image URLs */}
            <div>
              {Object.keys(formData).map((key) => {
                if (key.startsWith("image_url_") && formData[key]) {
                  return (
                    <img
                      key={key}
                      src={formData[key]}
                      alt={`Image ${key.split("_")[2]}`}
                      style={{ maxWidth: "100px", marginRight: "5px" }}
                    />
                  );
                }
                return null;
              })}
            </div>
            {/* Input fields for image URLs */}
            {[1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                name={`image_url_${index}`}
                value={formData[`image_url_${index}`]}
                onChange={handleChange}
                className="form-control mt-2"
                placeholder={`Image URL ${index}`}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </form>
      )}
    </div>
  );
}

export default EditProduct;
