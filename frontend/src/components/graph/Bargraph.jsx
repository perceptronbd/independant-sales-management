import { useState, useEffect } from "react";
import clsx from "clsx";

export const Bargraph = ({ fullHeight, day }) => {
  const [height, setHeight] = useState("0%");
  const [color, setColor] = useState("");

  useEffect(() => {
    // Function to gradually increase the height after a delay
    const animateHeight = () => {
      setHeight(fullHeight);
    };

    // Start the animation after a delay (e.g., 500 milliseconds)
    const animationTimeout = setTimeout(animateHeight, 500);

    // Clean up the timeout on component unmount
    return () => clearTimeout(animationTimeout);
  }, [fullHeight]);

  useEffect(() => {
    // Function to determine the color based on the height percentage
    const determineColor = () => {
      if (height <= "20%") {
        setColor("bg-red-500");
      } else if (height <= "40%") {
        setColor("bg-orange-red");
      } else if (height <= "60%") {
        setColor("bg-orange-500");
      } else if (height <= "80%") {
        setColor("bg-yellow-500");
      } else {
        setColor("bg-green-500");
      }
    };

    determineColor();
  }, [height]);

  return (
    <div
      className={`h-72 w-16 flex flex-col justify-end items-center mr-6 border border-backgroundColor-tertiary p-1 rounded-lg`}
    >
      <div
        className={clsx(
          "w-full rounded-t-lg transition-all duration-1000 ease-in-out flex justify-center font-semibold text-white bg-opacity-80",
          color
        )}
        style={{ height: height }}
      >
        {fullHeight}
      </div>
      <div className="text-xs text-textColor-tertiary">{day}</div>
    </div>
  );
};
