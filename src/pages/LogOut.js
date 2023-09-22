import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../store";
import { useDispatch } from "react-redux";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCLick = () => {
    localStorage.clear();
    dispatch(AuthActions.resetState());
    navigate("/");
  };
  return <div onClick={handleCLick}>Logout</div>;
}
