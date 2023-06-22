import React, { useEffect, useState } from "react";
import axios from "axios";
import { verifyManager } from "../../api/verifyUser";
import { Badge, ScrollArea, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash, IconCircleCheck } from "@tabler/icons-react";
import { getCheckoutReq, updateCheckoutStatus } from "../../api/crudApi";
import { useDisclosure } from "@mantine/hooks";
import { GridSkeleton } from "../../components/skeletons/GridSkeleton";

const roleColors = {
  manager: "blue",
  "generator-leader": "teal",
  generator: "red",
  prescriptor: "emerald",
  agent: "yellow",
  "co-user": "black",
  user: "gray",
};

export const Notifications = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reqCheckout, setReqCheckout] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const handleManagerRout = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        await verifyManager(user.refreshToken, setIsLoading);
        const res = await getCheckoutReq();
        console.log(res);
        setReqCheckout(res);
      } catch (error) {
        console.error("Notification:", error);
      }
    };
    handleManagerRout();
  }, []);

  const handleDelete = async (id) => {
    try {
      axios
        .delete("/deleteCheckoutReq/" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error retrieving purchases:", error);
        });
      const res = await getCheckoutReq();
      setReqCheckout(res);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleCheckout = async (userId, checkoutreqIs) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await updateCheckoutStatus(userId, checkoutreqIs);
      const resonse = await getCheckoutReq();
      setReqCheckout(resonse);
      console.log(res);
      setMsg(res);
      await verifyManager(user.refreshToken, setIsLoading);
      open();
    } catch (error) {
      console.error("Notification:", error);
    }
  };

  const notificationComponents = reqCheckout.map((item) => (
    <div
      key={item._id}
      className="grid grid-cols-12 gap-4 items-center rounded-lg h-18 bg-backgroundColor-secondary hover:bg-backgroundColor-tertiary my-2"
    >
      <div className="col-start-1 col-span-2 pl-4  p-2 rounded-lg">
        {item.user.firstName}
      </div>
      <div className="col-span-2">
        {" "}
        <Badge color={roleColors[item.user.role.toLowerCase()]}>
          {item.user.role}
        </Badge>
      </div>
      <div className="col-span-2">{item.checkoutCOP}</div>
      <div className="col-span-4 bg-backgroundColor-primary rounded-lg p-1">
        {item.comment}
      </div>
      <div className="col-end-13 flex">
        <Tooltip label="Delete Request" withArrow>
          <ActionIcon
            onClick={() => {
              handleDelete(item._id);
            }}
            className="hover:bg-backgroundColor-primary text-alert-danger"
          >
            <IconTrash size="1.2rem" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip withArrow label="Grant Request">
          <ActionIcon
            onClick={() => {
              handleCheckout(item.user._id, item._id);
            }}
            className="hover:bg-backgroundColor-primary text-alert-ok"
          >
            <IconCircleCheck size="1.2rem" stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col w-full m-1">
      {isLoading ? (
        <GridSkeleton />
      ) : (
        <div>
          <div className="font-title text-4xl font-semibold mb-4 w-full p-2">
            Notifications
          </div>
          <div className="font-body font-semibold w-full p-2">
            Requested Checkouts
          </div>
          {reqCheckout.length === 0 ? (
            <div
              className="bg-backgroundColor-secondary flex justify-center items-center rounded-lg m-1 w-full h-full text-textColor-tertiary
            font-bold text-5xl
          "
            >
              No Notifications
            </div>
          ) : (
            <ScrollArea h={520} scrollbarSize={4} offsetScrollbars>
              <div>{notificationComponents}</div>
            </ScrollArea>
          )}

          <Modal opened={opened} onClose={close} withCloseButton={true}>
            <div className="flex justify-center pb-10 pr-4 items-center text-center font-semibold !text-alert-highLight">
              {msg}
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
