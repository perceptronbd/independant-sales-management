import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  Badge,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  Modal,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import tw from "twin.macro";
import styled from "@emotion/styled";
import { deleteUser } from "../../api/crudApi";

const HeaderContainer = styled.div`
  ${tw`grid grid-cols-12 mobile:grid-cols-8 gap-4 w-full py-2 h-12 border-b-2`}
`;

const RowContainer = styled.div`
  ${tw`my-0 pr-1 font-light grid grid-cols-12 mobile:grid-cols-8 gap-4  items-center w-full rounded-lg h-12 hover:bg-backgroundColor-secondary`}
`;

const roleColors = {
  manager: "blue",
  "generator-leader": "teal",
  generator: "red",
  prescriptor: "emerald",
  agent: "yellow",
  "co-user": "black",
  user: "gray",
};

export function UserList({ data, refreshToken }) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const sortedData = data.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      console.log(res);
      if (res === 200) {
        open();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (userId) => {
    navigate("/home/edit-user", { state: userId });
  };

  const rows = sortedData.map((item) => {
    return (
      <>
        {item.role === "manager" ? (
          ""
        ) : (
          <RowContainer key={item._id}>
            <div className="col-start-1 col-span-2 pl-4 bg-backgroundColor-secondary p-2 rounded-lg mobile:hidden">
              <Text fz="sm" fw={500}>
                {item.firstName}
              </Text>
            </div>

            <div className="col-span-2 pl-4 mobile:hidden">
              <Badge color={roleColors[item.role.toLowerCase()]}>
                {item.role}
              </Badge>
            </div>
            <div className="col-span-3 pl-4 text-textColor-tertiary mobile:col-span-4">
              {item.email}
            </div>
            <div className="col-span-3 pl-4">
              {item.referredBy[0] ? (
                <div className="flex  justify-between items-center bg-backgroundColor-secondary p-2 rounded-lg mobile:hidden">
                  {item.referredBy[0].firstName}
                  <Badge color={roleColors[item.role.toLowerCase()]}>
                    {item.referredBy[0].role}
                  </Badge>
                </div>
              ) : (
                "None"
              )}
            </div>

            <div className="col-end-13 bg-backgroundColor-secondary p-2 rounded-lg mobile:col-start-8">
              <Group spacing={0} position="right">
                <ActionIcon
                  onClick={() => {
                    handleEdit(item._id);
                  }}
                  className="hover:bg-backgroundColor-primary"
                >
                  <IconPencil size="1rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => {
                    handleDelete(item._id, refreshToken);
                  }}
                >
                  <IconTrash size="1rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </div>
          </RowContainer>
        )}
      </>
    );
  });

  return (
    <div className="flex flex-col w-full">
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="flex text-alert-ok">
          <IconCircleCheckFilled />
          <span className="px-2">The user has been deleted succesfully!</span>
        </div>
      </Modal>
      <HeaderContainer>
        <div className="col-start-1 col-span-2 pl-4 border-gray-600 border rounded-2xl mobile:hidden">
          Name
        </div>
        <div className="col-span-2 pl-4 border-gray-600 border rounded-2xl mobile:hidden">
          Role
        </div>
        <div className="col-span-3 pl-4 border-gray-600 border rounded-2xl mobile:px-2 mobile:col-span-4">
          Email
        </div>
        <div
          className="col-span-3 px-4 border-gray-600 border rounded-2xl mobile:hidden
        "
        >
          <div className="flex justify-between">
            <span> Links to</span>
            <span className="text-textColor-tertiary"> Role</span>
          </div>
        </div>
        <div className="col-end-13 pl-4 border-gray-600 border rounded-2xl mobile:px-2  ">
          Action
        </div>
      </HeaderContainer>
      <ScrollArea h={520} scrollbarSize={4} offsetScrollbars>
        <>
          <div>{rows}</div>
        </>
      </ScrollArea>
    </div>
  );
}
