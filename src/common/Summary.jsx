import React from "react";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Summary() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/homepage");
  };
  return (
    <div className="text-center">
      <img
        width={100}
        height={100}
        src={check}
        alt="check"
        style={{ marginTop: "40vh" }}
      />
      <h2>Your Order is Succesfully Sent</h2>
      <div>
        <Button
          onClick={handleClick}
          style={{ cursor: "pointer", marginTop: "1%" }}
        >
          Back to HomePage
        </Button>
      </div>
    </div>
  );
}
