import React from "react";
import { ScrollArea } from "@mantine/core";
import { ButtonIcon } from "../buttons/ButtonIcon";
import tw from "twin.macro";
import styled from "@emotion/styled";

const HeadGrid = styled.div`
  ${tw`grid grid-cols-4 gap-2 h-12 items-center border-b-2`}
`;

const HeadGridItems = styled.div(({ icon }) => [
  tw`ml-6 my-0 pr-1 font-semibold flex justify-start text-textColor-tertiary`,
  icon && tw`justify-end mr-10`,
]);

const RowGrid = styled.div`
  ${tw`grid grid-cols-4 gap-2 my-2 items-center rounded-lg  hover:bg-backgroundColor-secondary`}
`;

const RowGridItems = styled.div(({ icon, secondary, tertiary }) => [
  tw`ml-6 pr-1 font-semibold flex justify-start group-hover:text-accent-primary`,
  icon && tw`justify-end hover:cursor-pointer `,
  secondary &&
    tw`text-textColor-secondary group-hover:text-textColor-secondary `,
  tertiary && tw`text-textColor-tertiary  group-hover:text-textColor-tertiary`,
]);

export const FileTable = ({ data }) => {
  const files = data.map((item) => (
    <RowGrid className="group" key={item.id}>
      <RowGridItems>{item.file}</RowGridItems>
      <RowGridItems tertiary>{item.date}</RowGridItems>
      <RowGridItems secondary>{item.username}</RowGridItems>
      <RowGridItems icon>
        <ButtonIcon variant="ghost">Download</ButtonIcon>
      </RowGridItems>
    </RowGrid>
  ));

  return (
    <div className="flex flex-col">
      <HeadGrid>
        <HeadGridItems>Files</HeadGridItems>
        <HeadGridItems tertiary>Date</HeadGridItems>
        <HeadGridItems secondary>Uploaded by</HeadGridItems>
        <HeadGridItems secondary icon>
          Action
        </HeadGridItems>
      </HeadGrid>
      <ScrollArea h={500} scrollbarSize={4}>
        {files}
      </ScrollArea>
    </div>
  );
};
