import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../services/ToastService";

import { updateOrderRequest } from "../services/Services";

export default function UpdateOrder(props) {
  const id = localStorage.id;
  const navigate = useNavigate();
  const formData = props.formData;

  const handleClick = async () => {
    try {
      await updateOrderRequest(formData, id, navigate);
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <>
      <Button
        style={props.formValid}
        disabled={props.disabled}
        onClick={handleClick}
      >
        Update
      </Button>
    </>
  );
}
