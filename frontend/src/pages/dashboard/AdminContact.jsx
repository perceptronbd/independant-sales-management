import React from "react";
import { Outlet } from "react-router-dom";
import { ContactBar } from "../../components";

export const AdminContact = () => {
  return (
    <div className="flex mr-1 ml-1 w-full">
      <ContactBar />
      <Outlet />
    </div>
  );
};
