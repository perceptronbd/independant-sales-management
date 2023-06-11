import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { RingProgress, Center } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import tw from "twin.macro";

const Text = styled.p(({ variant, color }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  variant === "secondary" && tw`text-textColor-tertiary`,
  variant === "title" &&
    tw`text-textColor-primary font-title font-bold text-base`,
  variant === "header" &&
    (color === "red"
      ? tw`text-red-500 font-title font-bold text-3xl`
      : tw`text-blue-500 font-title font-bold text-3xl`),
]);

export function ProgressRing({
  label = "Label",
  stats = "Stats",
  progress = 70,
  color = "blue",
  icon: Icon = IconArrowUpRight,
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimatedProgress((prevProgress) => {
        const step = Math.ceil(progress / 100);
        const nextProgress = prevProgress + step;
        return nextProgress > progress ? progress : nextProgress;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [progress]);

  return (
    <div className="flex justify-between  m-1 bg-backgroundColor-secondary rounded-md">
      <div className="m-4 flex flex-col justify-around">
        <Text variant="title">{label}</Text>
        <Text variant="secondary">{stats}</Text>
        <Text variant="header" color={color}>
          {animatedProgress}
        </Text>
      </div>
      <RingProgress
        size={120}
        roundCaps
        thickness={10}
        sections={[{ value: animatedProgress, color: color }]}
        label={
          <Center>
            <Icon size="1.4rem" stroke={1.5} />
          </Center>
        }
      />
    </div>
  );
}
