import clsx from "clsx";
import React from "react";

export const Card = ({
  icon: Icon,
  title = "Provide title",
  content = "Provide Content",
  variant = "default",
}) => {
  return (
    <div
      class={clsx(
        "flex flex-col p-4 bg-backgroundColor-secondary rounded-lg m-1 hover:text-white h-44",
        {
          "hover:bg-alert-highLight ": variant === "highlight",
          "hover:bg-accent-primary ": variant === "default",
        }
      )}
    >
      <Icon size="2.5rem" className="mb-0 pb-0" />
      <h2 class="text-xl font-bold mb-2">{title}</h2>
      <p class="">{content}</p>
    </div>
  );
};
