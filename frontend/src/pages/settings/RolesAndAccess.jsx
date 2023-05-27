import React, { useState } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { Text, RoleCard } from "../../components";

const Container = styled.div(() => [tw`flex flex-col w-full m-1`]);

export const RolesAndAccess = () => {
  return (
    <Container>
      <Text title>RolesAndAccess</Text>
      <div className="bg-backgroundColor-secondary h-full p-1">
        <RoleCard role="Agent" />
      </div>
    </Container>
  );
};
