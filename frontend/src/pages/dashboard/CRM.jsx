import React from "react";
import { Skeleton, Container } from "@mantine/core";

export const CRM = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div class="grid grid-cols-2 h-screen">
        <div class="flex flex-col">
          <div class="flex">
            <div class="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>
            <div class="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>{" "}
            <div class="w-1/2 h-40 p-1">
              <Skeleton radius="md" animate={true} className="  h-full" />
            </div>
          </div>

          <div class="flex flex-grow p-1">
            <Skeleton radius="md" animate={true} className="  h-full" />
          </div>
        </div>

        <div class="flex flex-grow p-1">
          <Skeleton radius="md" animate={true} className="  h-full" />
        </div>
      </div>
    </div>
  );
};
