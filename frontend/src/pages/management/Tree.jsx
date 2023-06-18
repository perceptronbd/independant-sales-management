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

  return (
    <div className="w-full">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col items-center bg-backgroundColor-secondary m-1 p-2 rounded-lg">
          <h1>Branch & Level</h1>
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
