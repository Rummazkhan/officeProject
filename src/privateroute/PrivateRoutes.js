import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { AppRoutes } from "../constants/RouteConstants";

export default function PrivateRoutes() {
  let token = localStorage.token;
  return token ? <Outlet /> : <Navigate to={AppRoutes.SIGNIN_ROUTE} />;
}
