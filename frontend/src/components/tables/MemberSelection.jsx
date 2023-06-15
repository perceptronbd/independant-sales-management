import React, { useState } from "react";
import { ScrollArea, Checkbox, createStyles } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: "#F6FAFF",
    color: "#3D5AFE",
  },
}));

const HeaderContainer = styled.div`
  ${tw`flex justify-between w-full py-2 h-12 border-b-2`}
`;

const HeaderItems = styled.div(() => [
  tw`mx-auto my-0 pr-1 font-light flex justify-start items-center  text-textColor-tertiary `,
]);

const RowContainer = styled.div`
  ${tw`my-0 pr-1 font-light flex justify-self-stretch items-center w-full rounded-lg h-12 hover:bg-backgroundColor-secondary`}
`;

const RowItems = styled.div(({ tertiary }) => [
  tw`mx-auto my-0 pr-1 font-semibold flex justify-start items-center group-hover:text-accent-primary`,
  tertiary && tw`text-textColor-tertiary`,
]);

export const MemberSelection = ({
  data,
  selectedMembers,
  onMemberSelection,
}) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id) => {
    setSelection([id]);

    const updatedSelectedMembers = selectedMembers.includes(id)
      ? selectedMembers.filter((item) => item !== id)
      : [...selectedMembers, id];

    onMemberSelection(updatedSelectedMembers);
  };

  const list = data.map((item) => {
    const selected = selection.includes(item.email);
    return (
      <RowContainer
        className={cx("group", { [classes.rowSelected]: selected })}
        key={item._id}
      >
        <Checkbox
          checked={selection.includes(item.email)}
          onChange={() => toggleRow(item.email)}
          readOnly
          transitionDuration={0}
          className="mx-4"
        />
        <RowItems className="w-10">{item.firstName}</RowItems>
        <RowItems className="w-10 text-textColor-tertiary">
          {item.email}
        </RowItems>
        <RowItems tertiary className="w-1/5">
          {item.lastPurchase}
        </RowItems>
        <RowItems className="w-24">${item.amount}</RowItems>
      </RowContainer>
    );
  });

  return (
    <div className="flex flex-col">
      <HeaderContainer>
        <Checkbox
          indeterminate={
            selection.length > 0 && selection.length !== data.length
          }
          transitionDuration={0}
          className="mx-4"
        />
        <HeaderItems tertiary className="w-1/5 px-8">
          Name
        </HeaderItems>
        <HeaderItems tertiary className="w-1/5">
          Email
        </HeaderItems>
        <HeaderItems secondary className="w-1/5">
          Last Purchase
        </HeaderItems>
        <HeaderItems secondary className="w-24">
          Amount
        </HeaderItems>
      </HeaderContainer>
      <ScrollArea h={420} scrollbarSize={4} offsetScrollbars>
        {list}
      </ScrollArea>
    </div>
  );
};
