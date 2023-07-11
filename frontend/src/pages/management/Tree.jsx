import React, { useEffect, useState } from "react";
import { ScrollArea } from "@mantine/core";
import { UserTree } from "../../components/userTree/UserTree";
import { getUserTree } from "../../api/crudApi";

export const Tree = () => {
  const [userTreeData, setUserTreeData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const res = await getUserTree(user._id);
        console.log(res);
        setUserTreeData(res);
        setLoading(false);
      } catch (error) {
        console.error("Tree:", error);
      }
    };
    fetchData();
  }, []);

  const getTotalUserCount = (user) => {
    let count = 0;

    const countUsers = (user) => {
      count++; // Increment the count for the current user

      // Recursively count users in the nested linksTo array
      if (user.linksTo && user.linksTo.length > 0) {
        user.linksTo.forEach((nestedUser) => {
          countUsers(nestedUser);
        });
      }
    };

    countUsers(user); // Start counting from the top-level user

    return count;
  };

  return (
    <div className="w-full">
      {loading ? (
        <div>loading...</div>
      ) : userTreeData.role === "agent" ? (
        <div
          className="bg-backgroundColor-secondary flex justify-center items-center rounded-lg m-1 w-full h-full text-textColor-tertiary
          font-bold text-5xl
        "
        >
          No user under your tree!
        </div>
      ) : (
        <div className="flex flex-col items-center bg-backgroundColor-secondary m-1 p-2 rounded-lg">
          <div className="w-full bg-white rounded-lg">
            <ScrollArea h={600} scrollbarSize={0} offsetScrollbars>
              <div className="px-2 ">
                <UserTree user={userTreeData} depth={0} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};
