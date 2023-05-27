import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { Text, RoleCard, SliderInput } from "../../components";

const mockData = [
  {
    role: "Agent",
    access: [
      { type: "Access Type 01", value: 1 },
      { type: "Access Type 02", value: 0 },
      { type: "Access Type 03", value: 1 },
      { type: "Access Type 04", value: 0 },
      { type: "Access Type 05", value: 1 },
    ],
  },
  {
    role: "Prescriptor",
    access: [
      { type: "Access Type 01", value: 0 },
      { type: "Access Type 02", value: 1 },
      { type: "Access Type 03", value: 1 },
      { type: "Access Type 04", value: 0 },
      { type: "Access Type 05", value: 1 },
    ],
  },
  {
    role: "Generedor",
    access: [
      { type: "Access Type 01", value: 0 },
      { type: "Access Type 02", value: 0 },
      { type: "Access Type 03", value: 1 },
      { type: "Access Type 04", value: 1 },
      { type: "Access Type 05", value: 1 },
    ],
  },
  {
    role: "Generedor Lider",
    access: [
      { type: "Access Type 01", value: 0 },
      { type: "Access Type 02", value: 1 },
      { type: "Access Type 03", value: 1 },
      { type: "Access Type 04", value: 1 },
      { type: "Access Type 05", value: 1 },
    ],
  },
  {
    role: "Manager",
    access: [
      { type: "Access Type 01", value: 1 },
      { type: "Access Type 02", value: 1 },
      { type: "Access Type 03", value: 1 },
      { type: "Access Type 04", value: 1 },
      { type: "Access Type 05", value: 1 },
    ],
  },
];
const Container = styled.div(() => [tw`flex flex-col h-max w-full m-1`]);

const Span = styled.span`
  ${tw`font-semibold my-2 p-2 bg-backgroundColor-tertiary text-textColor-tertiary border-l rounded`}
`;

const GridContainer = styled.div`
  ${tw`
    bg-backgroundColor-secondary
    w-full
    p-2
    flex
    rounded-xl
    justify-center items-center
  `}
`;

export const RolesAndAccess = () => {
  return (
    <Container>
      <Text title>Roles & Access</Text>
      <GridContainer>
        <div>
          <RoleCard />
          <RoleCard role="Prescriptor" />
          <RoleCard role="Generedor" />
          <RoleCard role="Generedor Lider" />
          <RoleCard role="Manager" />
        </div>

        {mockData.map((data) => (
          <div className="" key={data.role}>
            <RoleCard role={data.role} />
            {data.access.map((access) => (
              <SliderInput key={access.type} checked={access.value === 1} />
            ))}
          </div>
        ))}
      </GridContainer>
    </Container>
  );
};
