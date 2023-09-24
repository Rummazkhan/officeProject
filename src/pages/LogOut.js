import React from "react";
import { useNavigate } from "react-router-dom";
import { StoreActions } from "../store";
import { useDispatch } from "react-redux";
import { AppRoutes } from "../constants/RouteConstants";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCLick = () => {
    localStorage.clear();
    dispatch(StoreActions.resetState());
    navigate(AppRoutes.SIGNIN_ROUTE);
  };
  return <div onClick={handleCLick}>Logout</div>;
}
