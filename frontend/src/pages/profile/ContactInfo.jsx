import { Avatar, Badge } from "@mantine/core";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { useEffect } from "react";

const Text = styled.p(({ variant }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  variant === "secondary" && tw`text-textColor-tertiary`,
  variant === "title" &&
    tw`text-textColor-primary font-title font-bold text-base`,
  variant === "header" &&
    tw`text-textColor-primary font-title font-bold text-3xl`,
]);

const roleColors = {
  manager: "blue",
  "generator-leader": "teal",
  generator: "red",
  prescriptor: "emerald",
  agent: "yellow",
  "co-user": "black",
  user: "gray",
};

export function ContactInfo({ role, name, email }) {
  const data = JSON.parse(localStorage.getItem("user"));
  const user = data;

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("refreshToken: ", user.refreshToken);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center bg-backgroundColor-secondary rounded-xl p-4 h-24">
      <Avatar size={64} radius="lg" />
      <div>
        <div className="flex">
          <Text className="!text-textColor-primary"> {email}</Text>
        </div>
        <Badge color={roleColors[role.toLowerCase()]} className="mobile:hidden">
          {role}
        </Badge>
        {user.refCode ? (
          <div>
            <p className="!text-alert-warning rounded-lg font-medium border-2 text-center border-alert-warning px-2 my-1">
              Refferal Code: {user.refCode}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
