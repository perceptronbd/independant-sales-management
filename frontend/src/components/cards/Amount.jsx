import React, { useEffect, useState } from "react";
import { IconWallet } from "@tabler/icons-react";
import clsx from "clsx";

export const Amount = ({ usersCount = 100, className, user = "Users" }) => {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    let startCount = 0;
    const endCount = usersCount;
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
  }, [usersCount]);

  return (
    <div
      className={clsx(
        "bg-backgroundColor-secondary flex justify-between items-start flex-col w-60 rounded-lg p-3 m-1",
        className
      )}
    >
      <h2 className=" font-semibold text-textColor-secondary">
        Available Amount
      </h2>
      <div className="flex">
        <IconWallet size="2.5rem" className="mb-0 pb-0 text-alert-highLight" />
        <div className="font-bold text-alert-highLight text-4xl">
          {animatedCount}
        </div>
        <div className="text-textColor-secondary p-1">$</div>
      </div>
    </div>
  );
};
