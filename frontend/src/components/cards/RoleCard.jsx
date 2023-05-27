import React from "react";
import clsx from "clsx";
import { Text } from "../texts/Text";

const Bar = ({ role }) => {
  return (
    <div
      className={clsx("w-16 h-1 bg-gradient-to-r rounded-xl", {
        "from-red-500 to-red-200": role === "Agent",
        "from-orange-500 to-orange-200": role === "Prescriptor",
        "from-yellow-500 to-yellow-200": role === "Generedor",
        "from-green-500 to-green-200": role === "Generedor Lider",
        "from-green-800 to-green-500": role === "Manager",
      })}
    ></div>
  );
};

export const RoleCard = ({ role = "Agent", totalUers }) => {
  const authorityLevel = () => {
    switch (role) {
      case "Agent":
        return "Very Low";
      case "Prescriptor":
        return "Low";
      case "Generedor":
        return "Medium";
      case "Generedor Lider":
        return "High";
      case "Manager":
        return "Very High";
      default:
        return "Low";
    }
  };

  return (
    <div
      className="bg-white
   h-28 w-40 rounded-lg flex flex-col justify-between"
    >
      <div className="m-2">
        <Text secondary>{totalUers} Users</Text>
        <Text header>{role}</Text>
      </div>
      <div className="mx-2 mb-2">
        <Text secondary> Authority Level</Text>
        <Text>
          {authorityLevel()}
          <Bar role={role} />
        </Text>
      </div>
    </div>
  );
};
