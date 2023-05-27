import { Avatar } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { IconPhoneCall, IconAt, IconGridDots } from "@tabler/icons-react";
import { Button } from "../../components";

const Text = styled.p(({ title, secondary, header }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  secondary && tw`text-textColor-tertiary`,
  title && tw`text-textColor-primary font-title font-bold text-base`,
  header && tw`text-textColor-primary font-title font-bold text-3xl`,
]);

export function ContactInfo({
  avatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  title = "Generator",
  name = "Firstname Lastname",
  email = "mail@glassbreaker.io",
  phone = "+11 (876) 890 56 23",
}) {
  return (
    <>
      <div className="flex flex-col items-center mb-2">
        <Avatar src={avatar} size={94} radius="lg" className="m-4" />
        <Text secondary>{title}</Text>

        <Text title>{name}</Text>

        <div className="flex">
          <IconAt
            stroke={1.5}
            size="1rem"
            className="text-textColor-secondary mr-1"
          />
          <Text>{email}</Text>
        </div>
        <div className="flex">
          <IconPhoneCall
            stroke={1.5}
            size="1rem"
            className="text-textColor-secondary mr-1"
          />
          <Text fz="xs" c="dimmed">
            {phone}
          </Text>
        </div>
      </div>
    </>
  );
}
