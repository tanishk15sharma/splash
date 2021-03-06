import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserTokenFromLocalStorage } from "../features/authSlice";

const PrivateRoutes = () => {
  const token = getUserTokenFromLocalStorage();

  return <div>{token ? <Outlet /> : <Navigate to="/login" replace />}</div>;
};

export { PrivateRoutes };
