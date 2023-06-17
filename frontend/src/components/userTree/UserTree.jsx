import React, { useState } from "react";
import clsx from "clsx";

export const UserTree = ({ user, depth }) => {
  const { email, linksTo } = user;
  const hasChildren = linksTo.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const marginLeft = `${depth * 20}px`;
  const textColor = `hsl(${depth * 30}, 70%, 50%)`;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userClass = clsx("user", { "user--open": isOpen });

  const renderUser = (user) => (
    <div className={userClass} style={{ marginLeft }}>
      <div
        className="user__header"
        onClick={hasChildren ? toggleDropdown : undefined}
      >
        {hasChildren && (
          <span className="user__bullet" style={{ color: textColor }}>
            {isOpen ? "-" : "+"}
          </span>
        )}
        <div style={{ color: textColor }}>{email}</div>
      </div>
      {isOpen &&
        linksTo.map((childUser) => (
          <UserTree key={childUser.id} user={childUser} depth={depth + 1} />
        ))}
    </div>
  );

  return <div>{renderUser(user)}</div>;
};
