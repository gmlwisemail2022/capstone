import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import Delete from "../Components/Delete";

const ListAll = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "/listAll?page=" + currentPage
        //`http://localhost:3100/listAll?page=${currentPage}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_SERVER_API +
          "/delete/product/" +
          productIdToDelete
        //`http://localhost:3100/delete/product/${productIdToDelete}`
      );
      fetchProducts();
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

  return (
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
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default ListAll;
