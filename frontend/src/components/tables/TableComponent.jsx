import React from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import tw from "twin.macro";
import styled from "@emotion/styled";

const Grid = styled.div`
  ${tw`grid grid-cols-4 gap-2 my-2 items-center rounded-lg  hover:bg-backgroundColor-secondary`}
`;

const GridItems = styled.div(({ icon, secondary, tertiary }) => [
  tw`ml-6 pr-1 font-semibold flex justify-start group-hover:text-accent-primary`,
  icon && tw`justify-end hover:cursor-pointer `,
  secondary &&
    tw`text-textColor-secondary group-hover:text-textColor-secondary `,
  tertiary && tw`text-textColor-tertiary  group-hover:text-textColor-tertiary`,
]);

export const TableComponent = ({
  file = "file name",
  date = "01 Jan 23",
  username = "User Name",
}) => {
  return (
    <Grid className="group">
      <GridItems>{file}</GridItems>
      <GridItems tertiary>{date}</GridItems>
      <GridItems secondary>{username}</GridItems>
      <GridItems icon>
        <ButtonIcon variant="ghost">Download</ButtonIcon>
      </GridItems>
    </Grid>
  );
};
