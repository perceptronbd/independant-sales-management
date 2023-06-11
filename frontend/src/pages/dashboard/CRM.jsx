import React from "react";
import { Skeleton, Container } from "@mantine/core";

export const CRM = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-2 h-screen">
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>
            <div className="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>{" "}
            <div className="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>
          </div>

          <div className="flex flex-grow p-1">
            <Skeleton radius="md" animate={true} className="  h-full" />
          </div>
        </div>

        <div className="flex flex-grow p-1">
          <Skeleton radius="md" animate={true} className="  h-full" />
        </div>
      </div>
    </div>
  );
};
