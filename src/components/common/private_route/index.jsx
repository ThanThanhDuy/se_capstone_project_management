import React from "react";
import { Navigate, Route } from "react-router-dom";
import { LOGIN_URL } from "../../../constant/url";

const PrivateRoute = (props) => {
  const isLogined = Boolean(localStorage.getItem("access_token"));
  if (!isLogined) return <Navigate to={LOGIN_URL} replace />;

  return <Route {...props} />;
};

export default PrivateRoute;
