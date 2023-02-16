import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./useContext/UserContext";
import React, { useContext, useEffect } from "react";

const PrivateRoutes = () => {
  const { setValue } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setValue(user);
  }, []);

  return user ? <Outlet/> : <Navigate to="/" />;
};

export default PrivateRoutes;
