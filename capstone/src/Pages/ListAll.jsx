import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ListAll() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store productId to be deleted

  // Function to handle opening modal
  const handleOpenModal = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle deletion of product
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:3100/delete/product/${productIdToDelete}`
      );
      // Refresh product list after deletion
      fetchProducts();
      setShowModal(false); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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

        {/* Modal for confirming deletion */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.product_id}>
              <div className="card h-100">
                <div style={{ height: "60%" }}>
                  <img
                    src={
                      product.image_url_1 || "https://via.placeholder.com/300"
                    }
                    className="card-img-top"
                    alt="Product Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="card-body"
                  style={{ height: "100px", overflowY: "auto" }}
                >
                  <h5 className="card-title">Product Name:</h5>
                  <p className="card-text">{product.product_name}</p>
                  {/*}
                  <h5 className="card-title">External Id:</h5>
                  <p className="card-text">{product.external_id}</p>
                  */}
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
                  <button
                    onClick={() => handleOpenModal(product.product_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
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
