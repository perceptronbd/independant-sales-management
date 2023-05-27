import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../cards/User";

const userData = {
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  title: "Generator",
  name: "Firstname Lastname",
  email: "mail@glassbreaker.io",
  phone: "+11 (876) 890 56 23",
};
export const ContactBar = () => {
  return (
    <div className="flex justify-around w-3/4 h-full">
      <NavLink to={"user-info"}>
        <User data={userData} />
      </NavLink>
      <NavLink to={"user-info"}>
        <User data={userData} />
      </NavLink>
      <NavLink to={"user-info"}>
        <User data={userData} />
      </NavLink>
    </div>
  );
};
