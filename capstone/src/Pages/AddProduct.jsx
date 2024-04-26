import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    external_id: 0,
    product_name: "",
    description: "",
    category: "",
    image_url_1: "",
    image_url_2: "",
    image_url_3: "",
    image_url_4: "",
    image_url_5: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3100/add/product`,
        formData
      );
      console.log("temp-created!", response.data);
      setAlertMessage(
        `Product "${formData.product_name}" created successfully.`
      );
      // Clear form data after successful submission
      setFormData({
        external_id: 0,
        product_name: "",
        description: "",
        category: "",
        image_url_1: "",
        image_url_2: "",
        image_url_3: "",
        image_url_4: "",
        image_url_5: "",
      });
      // Redirect to homepage after successful addition
      //navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertMessage(error.response.data.message);
      } else {
        setAlertMessage("Error adding product. Please try again later.");
      }
    }
  };
  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Hidden input field for external_id since this is not coming from 3rd party apps or csv file*/}
        <input type="hidden" name="external_id" value={formData.external_id} />
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
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
