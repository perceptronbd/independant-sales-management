import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";

const Grid = styled.div`
  ${tw`grid grid-cols-4 gap-2 my-1
   h-12 items-end rounded-full`}
`;

const GridItems = styled.div(() => [
  tw`ml-6 my-0 pr-1 font-light flex justify-start text-textColor-tertiary`,
]);

export const TableHeader = ({
  file = "file name",
  date = "01 Jan 23",
  username = "User Name",
}) => {
  return (
    <Grid>
      <GridItems>{file}</GridItems>
      <GridItems tertiary>{date}</GridItems>
      <GridItems secondary>{username}</GridItems>
      <GridItems icon></GridItems>
    </Grid>
  );
};
