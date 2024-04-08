// /capstone/capstone/src/Components/Delete.jsx
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Delete = ({ showModal, handleCloseModal, handleDeleteProduct }) => {
  return (
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
  );
};

export default Delete;
