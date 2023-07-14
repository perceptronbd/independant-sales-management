import React, { useState } from "react";
import {
  IconSquareRoundedMinus,
  IconCornerDownRight,
} from "@tabler/icons-react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

export const UserTree = ({ user, depth = 0 }) => {
  const { name, email, role, linksTo } = user;
  const hasChildren = linksTo.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const marginLeft = `${depth * 40}px`;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const immediateChildrenCount = linksTo.length;

  const roleColors = {
    manager: "bg-blue-500",
    "generator-leader": "bg-teal-500",
    generator: "bg-red-500",
    prescriptor: "bg-emerald-500",
    agent: "bg-yellow-500",
    "co-user": "bg-gray-500",
    user: "bg-gray-400",
  };

  const userClass = clsx("user", { "user--open": isOpen });

  const roleOrder = {
    manager: 1,
    "generator-leader": 2,
    generator: 3,
    prescriptor: 4,
    agent: 5,
    "co-user": 6,
    user: 7,
  };

  const sortedLinksTo = linksTo.sort((a, b) => {
    const roleA = a.role.toLowerCase();
    const roleB = b.role.toLowerCase();
    return roleOrder[roleA] - roleOrder[roleB];
  });

  const renderUser = (user) => {
    const roleColor = roleColors[user.role.toLowerCase()];
    const roleBackgroundColor = ` ${roleColor}`;

    return (
      <div className={userClass} style={{ marginLeft }}>
        <div
          className={`user__header m-1`}
          onClick={hasChildren ? toggleDropdown : undefined}
          style={{ color: "white" }}
        >
          <div className={`flex items-center`}>
            <IconCornerDownRight className="text-backgroundColor-tertiary" />
            <div
              className={`p-2 rounded-lg ${roleBackgroundColor} w-64 mobile:w-auto`}
            >
              <div className="flex justify-between items-center mobile:flex-col mobile:items-start">
                <div className="font-semibold ">{name}</div>
                <div
                  className={`font-semibold text-xs bg-white bg-opacity-10 px-2 pb-1 rounded-2xl`}
                >
                  {role}
                </div>
              </div>
              <div className="text-sm opacity-50 mobile:hidden">{email}</div>
            </div>
            {hasChildren && (
              <span className="w-4 text-backgroundColor-tertiary  rounded-xl">
                {isOpen ? (
                  <IconSquareRoundedMinus />
                ) : (
                  <div className="flex">
                    {/* <IconSquareRoundedPlusFilled className="text-alert-warning" /> */}
                    <span
                      className="text-sm font-semibold bg-alert-warning text-white py-1 px-2 ml-1 rounded-lg transition-all
                    "
                    >
                      {immediateChildrenCount}
                    </span>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition-transform duration-300 ease-out"
          enterFrom="opacity-0 transform translate-y-0"
          enterTo="opacity-100 transform translate-y-4"
          leave="transition-transform duration-300 ease-in"
          leaveFrom="opacity-100 transform translate-y-0"
          leaveTo="opacity-0 transform translate-y-4"
        >
          {() => (
            <div className="pb-2">
              {sortedLinksTo.map((childUser) => {
                return (
                  <UserTree
                    key={childUser.id}
                    user={childUser}
                    depth={depth + 1}
                  />
                );
              })}
            </div>
          )}
        </Transition>
      </div>
    );
  };

  return <div className="mb-2">{renderUser(user)}</div>;
};
