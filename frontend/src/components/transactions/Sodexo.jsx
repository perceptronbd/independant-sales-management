import React, { useState } from "react";
import { Button } from "../buttons/Button";
import { Input, TextInput } from "@mantine/core";

export const Sodexo = () => {
  const [copValue, setCopValue] = useState(500);
  const [commentValue, setCommentValue] = useState("");

  const handleCopChange = (event) => {
    setCopValue(event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCheckout = () => {
    // Handle the checkout logic here with the copValue and commentValue
    console.log("COP:", copValue);
    console.log("Comment:", commentValue);
  };

  return (
    <div className="m-2">
      <div className="flex items-center my-2">
        <div className="pr-2 font-semibold">COP :</div>
        <Input
          placeholder="COP"
          name="COP"
          disabled
          value={500}
          onChange={handleCopChange}
          className="w-1/4"
        />
      </div>
      <TextInput
        label="Comment"
        placeholder="Commnet"
        name="comment"
        onChange={handleCommentChange}
        className="w-3/6"
      />
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};
