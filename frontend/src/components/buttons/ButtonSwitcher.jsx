import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "./Button";

export const ButtonSwitcher = () => {
  const [button1Variant, setButton1Variant] = useState("default");
  const [button2Variant, setButton2Variant] = useState("ghost");

  const handleButtonClick = () => {
    setButton1Variant(button2Variant);
    setButton2Variant(button1Variant);
  };

  return (
    <div
      className="m-1 bg-backgroundColor-secondary rounded-full
    "
    >
      <Button
        variant={button1Variant}
        onClick={handleButtonClick}
        rounded={true}
      >
        Button 1
      </Button>
      <Button
        variant={button2Variant}
        onClick={handleButtonClick}
        rounded={true}
      >
        Button 2
      </Button>
    </div>
  );
};
