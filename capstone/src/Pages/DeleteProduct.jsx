//to remove dleete page since deletion is handled by modal now
/*
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteProduct() {
  const { productId } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3100/delete/product/${productId}`);
      navigate("/listall"); // Redirect to the list all page after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error scenario
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => setConfirmDelete(true)}
          className="btn btn-danger me-2"
        >
          Yes
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          No
        </button>
      </div>


      {confirmDelete && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setConfirmDelete(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this product?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setConfirmDelete(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteProduct;
*/
