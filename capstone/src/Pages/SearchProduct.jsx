import React, { useState } from "react";
import axios from "axios";
import Search from "../Components/Search";
import ProductCard from "../Components/ProductCard";
import Delete from "../Components/Delete";

const SearchProduct = () => {
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState(
    "Input a search string and select the search type to show the products."
  );
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:3100/search`, null, {
        params: {
          type: searchType,
          value: searchValue,
        },
      });
      console.log("total products searched:", response.data.length);
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
      handleSearch(); // Refresh search results after deletion
      setShowModal(false); // Close delete modal after successful deletion
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

  return (
    <div className="container mt-4">
      {/* Search component */}
      <Search
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
      <div className="row mt-4">
        {searchMessage && (
          <div className="col-md-12 mb-4">
            <p>{searchMessage}</p>
          </div>
        )}
        {searchResults.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onDelete={() => handleOpenModal(product.product_id)} // Pass handleOpenModal function to ProductCard
          />
        ))}
      </div>
      {/* Delete modal */}
      <Delete
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteProduct={() => handleDeleteProduct(productIdToDelete)}
      />
    </div>
  );
};

export default SearchProduct;
