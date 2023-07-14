import React from "react";
import clsx from "clsx";
export const Text = ({
  children,
  title,
  header,
  secondary,
  error,
  ok,
  className,
}) => {
  return (
    <div
      className={clsx(className, [
        "text-textColor-secondary font-body text-sm ",
        title &&
          `text-textColor-primary !font-title font-semibold !text-2xl mobile:!text-lg`,
        header &&
          `text-textColor-primary font-special font-semibold !text-lg
        `,
        secondary && `text-textColor-tertiary`,
        error && `!text-alert-danger`,
        ok && `!text-alert-ok`,
      ])}
    >
      {children}
    </div>
  );
};
