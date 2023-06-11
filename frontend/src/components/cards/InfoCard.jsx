import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";

const Text = styled.p(({ variant }) => [
  tw`text-textColor-secondary font-medium font-body text-sm`,
  variant === "secondary" && tw`text-textColor-tertiary`,
  variant === "title" &&
    tw`text-textColor-primary font-title font-bold text-base`,
]);

const SomeText =
  "dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";
export const InfoCard = () => {
  return (
    <div className="pr-4 pl-4 pt-4 pb-2 rounded bg-backgroundColor-secondary">
      <Text variant="">Some Info</Text>
      <Text>{SomeText}</Text>
    </div>
  );
};
