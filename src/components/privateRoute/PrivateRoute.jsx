import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const login = window.localStorage.getItem("login");

  return login ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
