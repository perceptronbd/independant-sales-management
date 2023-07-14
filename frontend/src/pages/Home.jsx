import React from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export const Home = ({ handleLogout }) => {
  return (
    <div className="flex flex-row m-0 p-2 ">
      <Sidebar handleLogout={handleLogout} />
      <Outlet />
    </div>
  );
};
