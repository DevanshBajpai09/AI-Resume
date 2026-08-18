import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Component/Loader";

const Layout = () => {
  const { loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default Layout;