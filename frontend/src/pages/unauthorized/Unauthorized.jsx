import React from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import { Text } from "../../components";

export const Unauthorized = () => {
  return (
    <div className="w-full h-20 m-1">
      <div
        className=" bg-alert-danger/20
       w-full h-full rounded-lg flex items-center justify-center"
      >
        <Text
          className={"!text-alert-danger font-title text-2xl flex items-center"}
        >
          <IconAlertCircle size={"26px"} className="mx-2" />
          You are not Authorized!
        </Text>
      </div>
    </div>
  );
};
