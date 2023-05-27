import React from "react";
import clsx from "clsx";

export const Button = ({
  variant = "default",
  active = false,
  children,
  className,
  rounded,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `px-4 py-2 rounded m-1 h-10 ${className}`,
        {
          "bg-accent-primary text-white": variant === "default" || !variant,
          "bg-yellow-500 text-black": variant === "warning",
          "bg-red-500 text-white": variant === "error",
          "bg-alert-highLight text-white": variant === "highlight",
          "bg-backgroundColor-secondary text-gray-500 hover:bg-gray-100 hover:text-gray-800":
            variant === "ghost",
          "text-textColor-secondary bg-backgroundColor-secondary hover:bg-backgroundColor-tertiary hover:text-accent-primary":
            variant === "ghost",
        },
        rounded && "rounded-full h-8 w-32",
        disabled &&
          "bg-backgroundColor-tertiary text-textColor-secondary cursor-not-allowed",
        "hover:bg-opacity-80 transition-colors duration-300"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
