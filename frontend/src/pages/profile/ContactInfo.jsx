import { Avatar } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { IconAt } from "@tabler/icons-react";
import { generateRefCode } from "../../api/generateRefCode";
import { useState } from "react";

const Text = styled.p(({ variant }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  variant === "secondary" && tw`text-textColor-tertiary`,
  variant === "title" &&
    tw`text-textColor-primary font-title font-bold text-base`,
  variant === "header" &&
    tw`text-textColor-primary font-title font-bold text-3xl`,
]);

export function ContactInfo({
  avatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  role = "Generator",
  name = "Firstname Lastname",
  email = "mail@glassbreaker.io",
}) {
  const data = JSON.parse(localStorage.getItem("user"));
  const user = data;
  const _id = user._id;

  const [reffCode, setReffCode] = useState(user.refCode);

  const handleGenerateRefCode = async () => {
    await generateRefCode(_id, setReffCode);
  };

  return (
    <>
      <div className="flex flex-col items-center mb-2">
        <Avatar src={avatar} size={94} radius="lg" className="m-4" />
        <Text variant="secondary">{role}</Text>

        <Text variant="title">{name}</Text>

        <div className="flex">
          <IconAt
            stroke={1.5}
            size="1rem"
            className="text-textColor-secondary mr-1"
          />
          <Text>{email}</Text>
        </div>
        <div>
          {reffCode ? (
            <p className="!text-alert-warning rounded-lg font-medium border-2 border-alert-warning px-2 my-1">
              Refferal Code: {reffCode}
            </p>
          ) : (
            <button
              className="!bg-alert-warning text-white rounded-lg font-medium border-2 border-alert-warning px-2 py-1 my-1"
              onClick={handleGenerateRefCode}
            >
              Generate Referal code
            </button>
          )}
        </div>
        {/* <div className="flex">
          <IconPhoneCall
            stroke={1.5}
            size="1rem"
            className="text-textColor-secondary mr-1"
          />
          <Text fz="xs" c="dimmed">
            {phone}
          </Text>
        </div> */}
      </div>
    </>
  );
}
