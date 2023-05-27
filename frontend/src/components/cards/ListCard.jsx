import React from "react";
import tw from "twin.macro";
import { IconUserCircle } from "@tabler/icons-react";
import { Button } from "../buttons/Button";
import styled from "@emotion/styled";

const IconContainer = styled.div`
  ${tw`h-full w-16 flex items-center justify-center `}
`;

const Icon = styled.div`
  ${tw`bg-white rounded-full p-1 text-textColor-secondary group-hover:text-accent-primary`}
`;
const NamePlate = styled.div`
  ${tw`flex flex-col p-1`}
  h1 {
    ${tw`font-title font-bold text-base text-textColor-primary group-hover:text-accent-primary`}
  }
  p {
    ${tw`font-body text-xs font-medium text-textColor-tertiary `}
  }
`;

const Text = styled.p(({ secondary }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  secondary && tw`text-textColor-tertiary`,
]);

export const ListCard = ({ className }) => {
  return (
    <div className="bg-backgroundColor-secondary flex flex-row justify-around m-2 p-2 h-14 rounded-lg group">
      <div className="flex h-full w-1/4">
        <IconContainer>
          <Icon>
            <IconUserCircle />
          </Icon>
        </IconContainer>
        <NamePlate>
          <h1>Title</h1>
          <p>Subtitle@mail.com</p>
        </NamePlate>
      </div>
      <div className="flex w-1/2">
        <div className="h-full w-1/4 flex items-center p-2">
          <Text>Role</Text>
        </div>
        <div className="h-full w-1/2 flex items-center p-2">
          <Text secondary>ID: 12345</Text>
        </div>
        <div className="h-full w-1/4 flex items-center p-2">
          <Text>Join Time</Text>
        </div>
      </div>
      <div className="h-full w-1/4 flex justify-center items-center">
        <Button rounded>Click Me</Button>
      </div>
    </div>
  );
};
