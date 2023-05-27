import { Avatar } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";

const Text = styled.p(({ title, secondary, header }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  secondary && tw`text-textColor-tertiary`,
  title && tw`text-textColor-primary font-title font-bold text-base`,
  header && tw`text-textColor-primary font-title font-bold text-3xl`,
]);

export function User({ data }) {
  return (
    <>
      <div className="flex flex-col ml-1 p-4 items-center bg-backgroundColor-secondary rounded-md">
        <div className="flex flex-col items-center">
          <Avatar src={data.avatar} size={200} radius="lg" className="m-1" />
          <Text secondary>{data.title}</Text>

          <Text title>{data.name}</Text>

          <div className="flex">
            <IconAt
              stroke={1.5}
              size="1rem"
              className="text-textColor-secondary mr-1"
            />
            <Text>{data.email}</Text>
          </div>
          <div className="flex">
            <IconPhoneCall
              stroke={1.5}
              size="1rem"
              className="text-textColor-secondary mr-1"
            />
            <Text fz="xs" c="dimmed">
              {data.phone}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
