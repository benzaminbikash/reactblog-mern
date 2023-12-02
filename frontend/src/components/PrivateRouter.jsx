import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

function PrivateRouter() {
  const state = useSelector((state) => state.token);
  return state?.token ? <Outlet /> : <Login />;
}

export default PrivateRouter;
