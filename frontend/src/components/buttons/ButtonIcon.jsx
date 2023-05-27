import React from "react";
import { IconDownload } from "@tabler/icons-react";
import clsx from "clsx";

export const ButtonIcon = ({
  variant = "default",
  active = false,
  children,
  className,
  rounded,
  icon: Icon = IconDownload,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `rounded font-body m-2 h-10 font-semibold  ${className}`,
        {
          "bg-accent-primary text-white": variant === "default" || !variant,
          "bg-yellow-500 text-black": variant === "warning",
          "bg-red-500 text-white": variant === "error",
          "bg-alert-highLight text-white": variant === "highlight",
          "text-textColor-secondary hover:bg-backgroundColor-tertiary hover:text-accent-primary":
            variant === "ghost",
        },
        rounded && "rounded-full h-8 w-32",
        "hover:bg-opacity-80 transition-colors duration-300"
      )}
      {...props}
    >
      <div className=" flex m-2 px-4 justify-center items-center">
        <Icon size={"1.5rem"} className="mr-2" /> {children}
      </div>
    </button>
  );
};
