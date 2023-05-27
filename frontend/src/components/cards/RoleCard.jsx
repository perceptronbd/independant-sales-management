import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { Text } from "../texts/Text";

const BarColor = styled.div((role) => [
  tw`bg-backgroundColor-tertiary w-2`,
  role === "Agent" && tw`bg-blue-500`,
]);

export const RoleCard = ({ role = "Agent", totalUers }) => {
  return (
    <div
      className="bg-white
   h-28 w-36 rounded-lg flex flex-col  justify-between"
    >
      <div className="m-2">
        <Text secondary>{totalUers} Users</Text>
        <Text header>{role}</Text>
      </div>
      <div className="mx-2 mb-2">
        <Text secondary> Authority Level</Text>
        <Text>
          {"Low"}{" "}
          <span className="grid grid-cols-5 h-1 w-12">
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
          </span>
        </Text>
      </div>
    </div>
  );
};
