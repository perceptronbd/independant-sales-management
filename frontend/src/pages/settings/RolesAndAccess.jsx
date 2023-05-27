import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { Text, RoleCard, SliderInput } from "../../components";

const mockData = [
  {
    role: "Agent",
    access: [
      { type: "Create User", value: 1 },
      { type: "Edit User", value: 1 },
      { type: "Create Role", value: 0 },
      { type: "Edit Role", value: 0 },
      { type: "Create Access", value: 0 },
      { type: "Delete Access", value: 0 },
    ],
  },
  {
    role: "Prescriptor",
    access: [
      { type: "Create User", value: 1 },
      { type: "Edit User", value: 0 },
      { type: "Create Role", value: 1 },
      { type: "Edit Role", value: 0 },
      { type: "Create Access", value: 0 },
      { type: "Delete Access", value: 0 },
    ],
  },
  {
    role: "Generedor",
    access: [
      { type: "Create User", value: 1 },
      { type: "Edit User", value: 1 },
      { type: "Create Role", value: 1 },
      { type: "Edit Role", value: 0 },
      { type: "Create Access", value: 0 },
      { type: "Delete Access", value: 0 },
    ],
  },
  {
    role: "Generedor Lider",
    access: [
      { type: "Create User", value: 1 },
      { type: "Edit User", value: 1 },
      { type: "Create Role", value: 1 },
      { type: "Edit Role", value: 1 },
      { type: "Create Access", value: 0 },
      { type: "Delete Access", value: 0 },
    ],
  },
  {
    role: "Manager",
    access: [
      { type: "Create User", value: 1 },
      { type: "Edit User", value: 1 },
      { type: "Create Role", value: 1 },
      { type: "Edit Role", value: 1 },
      { type: "Create Access", value: 1 },
      { type: "Delete Access", value: 1 },
    ],
  },
];
const Container = styled.div(() => [tw`flex flex-col w-full m-1`]);

const Span = styled.span`
  ${tw`font-semibold flex justify-center items-center bg-backgroundColor-tertiary border-l rounded my-2 h-12 `}
`;

const RowContainer = styled.div`
  ${tw`
    bg-backgroundColor-secondary
    w-full
    justify-between
    p-2
    flex
    rounded-xl
  `}
`;

const RowGrid = styled.div`
  ${tw`grid [grid-auto-rows: max-content] justify-center items-center
    `}
`;

export const RolesAndAccess = () => {
  const accessTypes = [];

  // Iterate over the data array to extract access types
  for (let i = 0; i < mockData.length; i++) {
    const accessKeys = mockData[i].access;

    for (let j = 0; j < accessKeys.length; j++) {
      const accessKey = accessKeys[j].type;

      if (!accessTypes.includes(accessKey)) {
        accessTypes.push(accessKey);
      }
    }
  }

  const accessTypeElements = accessTypes.map((accessType, index) => (
    <Span key={index}>{accessType}</Span>
  ));

  return (
    <Container>
      <Text title>Roles & Access</Text>
      <RowContainer>
        <RowGrid>
          <span className="h-28 w-40"></span>
          {accessTypeElements}
        </RowGrid>

        {mockData.map((data) => (
          <RowGrid key={data.role}>
            <RoleCard role={data.role} />
            {data.access.map((access) => (
              <SliderInput key={access.type} checked={access.value === 1} />
            ))}
          </RowGrid>
        ))}
      </RowContainer>
    </Container>
  );
};
