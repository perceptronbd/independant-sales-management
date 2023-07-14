import React, { useState } from "react";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";
import { useDisclosure } from "@mantine/hooks";
import { Input, TextInput, Modal } from "@mantine/core";
import {
  IconWallet,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import { makeCheckoutRequest } from "../../api/crudApi";

export const Sodexo = () => {
  const [copValue, setCopValue] = useState(500);
  const [commentValue, setCommentValue] = useState("No comments");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCopChange = (event) => {
    setCopValue(event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await makeCheckoutRequest(
        user._id,
        copValue,
        commentValue
      );

      console.log("Checkout response:", response.message);
      setMsg(response.message);
      setError(false);
      open();
    } catch (error) {
      const errMsg = error.response.data.error;
      console.error("Error during checkout:", errMsg);
      setMsg(errMsg);
      setError(true);
      open();
    }
  };

  return (
    <div className="m-2">
      <div className="flex mb-6 w-1/4 justify-between bg-backgroundColor-tertiary p-2 rounded-xl mobile:w-full">
        <Text title>Sodexo Pass</Text>
        <IconWallet size={"34px"} className="text-alert-ok" />
      </div>
      <div className="flex items-center my-2">
        <div className="pr-2 font-semibold">COP :</div>
        <Input
          placeholder="COP"
          name="COP"
          type="number"
          disabled
          value={copValue}
          onChange={handleCopChange}
          className="w-1/4"
        />
      </div>
      <TextInput
        label="Comment"
        placeholder="Comment"
        name="comment"
        value={commentValue}
        onChange={handleCommentChange}
        className="w-3/6"
      />
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        {error ? (
          <Text className={"flex items-center "} error>
            <IconAlertCircle /> <div className="mx-2">{msg}</div>
          </Text>
        ) : (
          <Text className={"flex items-center "} ok>
            <IconCircleCheck /> <div className="mx-2">{msg}</div>
          </Text>
        )}
      </Modal>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};
