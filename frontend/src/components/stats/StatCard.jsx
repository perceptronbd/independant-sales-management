import React, { useEffect, useState } from "react";
import clsx from "clsx";

export const StatCard = ({
  icon: Icon,
  counts = 100,
  className,
  str,
  variant = "default",
}) => {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    let startCount = 0;
    const endCount = counts;
    const animationDuration = 1000; // Adjust the animation duration as needed
    const totalSteps = 50; // Adjust the number of steps as needed

    const increment = Math.ceil(endCount / totalSteps);

    const timer = setInterval(() => {
      startCount += increment;
      if (startCount >= endCount) {
        clearInterval(timer);
        startCount = endCount;
      }
      setAnimatedCount(startCount);
    }, animationDuration / totalSteps);

    return () => clearInterval(timer);
  }, [counts]);

  return (
    <div className="flex w-60 justify-between bg-backgroundColor-secondary rounded-md p-4 pt-2 pb-2 m-1">
      <div className="flex flex-col">
        <div
          className={clsx("font-bold text-4xl", {
            "text-alert-highLight": variant === "highlight",
            "text-alert-ok": variant === "ok",
            "text-textColor-primary": variant === "default",
          })}
        >
          {animatedCount}
        </div>
        <h2 className=" font-semibold text-textColor-secondary">{str}</h2>
      </div>
      <div className="flex justify-center items-center ">
        <Icon size="1.5rem" className="mb-0 pb-0 text-textColor-secondary" />
      </div>
    </div>
  );
};
