import React, { useState } from "react";
import { ScrollArea, Checkbox, createStyles, Badge } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";

const roleColors = {
  manager: "blue",
  "generator-leader": "teal",
  generator: "red",
  prescriptor: "emerald",
  agent: "yellow",
  "co-user": "black",
  user: "gray",
};

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
  const toggleRow = (_id) => {
    const selectedMemberEmail = selectedMember === _id ? null : _id;
    setSelection(selectedMemberEmail);
    onMemberSelection(selectedMemberEmail);
  };

  const list = data.map((item) => {
    const selected = selection.includes(item._id);
    return (
      <RowContainer
        className={cx("group", { [classes.rowSelected]: selected })}
        key={item._id}
      >
        <Checkbox
          readOnly
          checked={selection.includes(item._id)}
          onChange={() => toggleRow(item._id)}
          transitionDuration={0}
          className="mx-4"
        />
        <RowItems className="w-10 mobile:!hidden">{item.firstName}</RowItems>
        <RowItems className="w-1/5 text-textColor-tertiary">
          {item.email}
        </RowItems>
        <RowItems className="w-1/5 text-textColor-tertiary mobile:!hidden">
          <Badge color={roleColors[item.role.toLowerCase()]}>{item.role}</Badge>
        </RowItems>
        <RowItems tertiary className="w-1/5">
          {item.lastPurchaseDate}
        </RowItems>
        <RowItems className="w-24 !text-alert-ok mobile:!hidden">
          ${item.totalAmountSpent}
        </RowItems>
      </RowContainer>
    );
  });

  return (
    <div className="flex flex-col mobile:w-[80vw]">
      <HeaderContainer>
        <Checkbox
          indeterminate={
            selection.length > 0 && selection.length !== data.length
          }
          transitionDuration={0}
          className="mx-4"
        />
        <HeaderItems tertiary className="w-10 mobile:!hidden">
          Name
        </HeaderItems>
        <HeaderItems tertiary className="w-1/5">
          Email
        </HeaderItems>
        <HeaderItems tertiary className="w-1/5 mobile:!hidden">
          Role
        </HeaderItems>
        <HeaderItems secondary className="w-1/5">
          Last Purchase
        </HeaderItems>
        <HeaderItems secondary className="w-24 mobile:!hidden">
          Amount
        </HeaderItems>
      </HeaderContainer>
      <ScrollArea h={420} scrollbarSize={4} offsetScrollbars>
        {list}
      </ScrollArea>
    </div>
  );
};
