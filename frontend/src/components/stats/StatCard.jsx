import React, { useEffect, useState } from "react";
import clsx from "clsx";

export const StatCard = ({
  icon: Icon,
  counts = 100,

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
    <div
      className={clsx(
        "flex w-52 justify-between bg-backgroundColor-secondary rounded-xl p-4 pt-2 pb-2 mx-1 h-24 mobile:my-2"
      )}
    >
      <div className="flex flex-col w-full">
        <div
          className={clsx("font-bold text-4xl", {
            "text-alert-highLight ": variant === "highlight",
            "text-alert-ok": variant === "ok",
            "text-textColor-primary": variant === "default",
          })}
        >
          <span className="flex justify-between items-center">
            {animatedCount}
            <Icon
              size="1.5rem"
              className="mb-0 pb-0 text-textColor-secondary"
            />
          </span>
        </div>
        <h2
          className={clsx(" text-white rounded-md bg-opacity-60", {
            "bg-alert-highLight px-3 ": variant === "highlight",
            "bg-alert-ok px-3 ": variant === "ok",
            "bg-alert-black px-3": variant === "default",
          })}
        >
          {str}
        </h2>
      </div>
      <div className="flex justify-center items-center "></div>
    </div>
  );
};
