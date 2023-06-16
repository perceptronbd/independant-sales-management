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
  selectedMember,
  onMemberSelection,
}) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (email) => {
    const selectedMemberEmail = selectedMember === email ? null : email;
    setSelection(selectedMemberEmail);
    onMemberSelection(selectedMemberEmail);
  };

  const list = data.map((item) => {
    const selected = selectedMember === item.email;
    return (
      <RowContainer
        className={cx("group", { [classes.rowSelected]: selected })}
        key={item._id}
      >
        <Checkbox
          readOnly
          checked={selection.includes(item.email)}
          onChange={() => toggleRow(item.email)}
          transitionDuration={0}
          className="mx-4"
        />
        <RowItems className="w-1/5 px-8">{item.firstName}</RowItems>
        <RowItems className="w-1/5 text-textColor-tertiary">
          {item.email}
        </RowItems>
        <RowItems className="w-1/5 text-textColor-tertiary">
          {item.lastPurchaseDate === null
            ? "No Purchase"
            : item.lastPurchaseDate}
        </RowItems>
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
      </HeaderContainer>
      <ScrollArea h={420} scrollbarSize={4} offsetScrollbars>
        {list}
      </ScrollArea>
    </div>
  );
};
