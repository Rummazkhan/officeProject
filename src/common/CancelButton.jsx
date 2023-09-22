import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "../assets/back.png";

export default function CancelButton(props) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(props.route);
  };
  return (
    <div className="mt-3 " onClick={goBack}>
      <img
        style={{ marginLeft: "1%", cursor: "pointer" }}
        width={30}
        height={30}
        src={Back}
        alt="back"
      />
      <span style={{ fontWeight: "bold", cursor: "pointer" }}>Back</span>
    </div>
  );
}
