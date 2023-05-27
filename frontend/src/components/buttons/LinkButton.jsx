import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export const LinkButton = ({
  variant = "default",
  active = false,
  children,
  className,
  to,
  ...props
}) => {
  return (
    <NavLink to={to}>
      <button
        className={clsx(
          `px-4 py-2 rounded font-body m-1 font-bold w-44 h-10 ${className}`,
          {
            "bg-accent-primary text-white": variant === "default" || !variant,
            "bg-yellow-500 text-black": variant === "warning",
            "bg-red-500 text-white": variant === "error",
            "bg-alert-highLight text-white": variant === "highlight",
            "bg-backgroundColor-tertiary text-gray-500 hover:bg-alert-highLight hover:text-white":
              variant === "ghost",
          },
          "hover:bg-opacity-80 transition-colors duration-300"
        )}
        {...props}
      >
        {children}
      </button>
    </NavLink>
  );
};
