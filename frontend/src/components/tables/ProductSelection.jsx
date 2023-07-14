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

const HeaderItems = styled.div`
  ${tw`ml-6 my-0 pr-1 font-light flex justify-start items-center text-textColor-tertiary`}
`;

const RowContainer = styled.div`
  ${tw`my-0 pr-1 font-light flex justify-between items-center w-full rounded-lg h-12 hover:bg-backgroundColor-secondary cursor-pointer`}
`;

const RowItems = styled.div(({ tertiary }) => [
  tw`ml-6 my-0 pr-1 font-semibold flex justify-start items-center group-hover:text-accent-primary`,
  tertiary && tw`text-textColor-tertiary`,
]);

export const ProductSelection = ({
  data,
  selectedProducts,
  handleProductSelection,
}) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);

  const toggleRow = (id) => {
    const updatedSelection = [...selection];

    if (updatedSelection.includes(id)) {
      updatedSelection.splice(updatedSelection.indexOf(id), 1);
    } else {
      updatedSelection.push(id);
    }

    setSelection(updatedSelection);
    handleProductSelection(updatedSelection);
  };

  const list = data.map((item) => {
    const selected = selection.includes(item._id);
    return (
      <RowContainer
        className={cx("group", { [classes.rowSelected]: selected })}
        key={item._id}
        onClick={() => toggleRow(item._id)}
      >
        <Checkbox
          checked={selected}
          onChange={() => toggleRow(item._id)}
          transitionDuration={0}
          className="mx-4"
        />
        <RowItems className="w-1/5 mobile:!w-1/3">{item.name}</RowItems>
        <RowItems tertiary className="w-1/5  mobile:!hidden">
          {item.category}
        </RowItems>
        <RowItems className="w-24 !text-alert-ok ">$ {item.price}</RowItems>
      </RowContainer>
    );
  });

  const toggleAllRows = () => {
    const updatedSelection =
      selection.length === data.length ? [] : data.map((item) => item._id);
    setSelection(updatedSelection);
    handleProductSelection(updatedSelection);
  };

  return (
    <div className="flex flex-col mobile:w-[80vw]">
      <HeaderContainer>
        <Checkbox
          checked={selection.length === data.length}
          indeterminate={
            selection.length > 0 && selection.length !== data.length
          }
          onChange={toggleAllRows}
          transitionDuration={0}
          className="mx-4"
        />
        <HeaderItems tertiary className="w-1/5 mobile:!w-1/3">
          Product
        </HeaderItems>
        <HeaderItems secondary className="w-1/5 mobile:!hidden">
          Category
        </HeaderItems>
        <HeaderItems secondary className="w-24">
          Price
        </HeaderItems>
      </HeaderContainer>
      <ScrollArea h={420} scrollbarSize={4} offsetScrollbars>
        {list}
      </ScrollArea>
    </div>
  );
};
