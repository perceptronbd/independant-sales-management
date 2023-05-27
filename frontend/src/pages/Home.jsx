import React from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-row m-0 p-2">
      <Sidebar />
      <Outlet />
    </div>
  );
};
