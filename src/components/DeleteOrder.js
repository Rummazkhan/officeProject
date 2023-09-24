import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../services/ToastService";
import { useDispatch } from "react-redux";
import { deleteOrderRequest } from "../services/Services";
import Trash from "../assets/icons/trash.png";

export default function DeleteOrder() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const id = localStorage.id;
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteOrderRequest(id, dispatch, navigate);
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <>
      <img
        style={{ marginLeft: "10%", cursor: "pointer" }}
        onClick={handleShow}
        width={30}
        height={30}
        src={Trash}
        alt="trash"
      />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete the order?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
