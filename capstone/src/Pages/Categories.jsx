import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import Delete from "../Components/Delete";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState(
    "Click on a category to display the products"
  );
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const fetchProductsByCategory = useCallback(async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_API + "/search/",
        null,
        {
          params: {
            type: "productName",
            value: category,
          },
        }
      );
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
      console.error("Error fetching products by category:", error);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetchProductsByCategory();
    }
  }, [category, fetchProductsByCategory]);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        process.env.REACT_APP_SERVER_API + "/delete/product/" + productId
      );
      fetchProductsByCategory();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenModal = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = (category) => {
    setCategory(category);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
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
      <div className="row">
        <div className="col-md-12 mb-4">
          <p>{searchMessage}</p>
        </div>
      </div>
      <div className="row mt-4">
        {searchResults.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onDelete={() => handleOpenModal(product.product_id)}
          />
        ))}
      </div>
      <Delete
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteProduct={() => handleDeleteProduct(productIdToDelete)}
      />
    </div>
  );
};

export default Categories;
