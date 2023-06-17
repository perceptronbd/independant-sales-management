import React, { useEffect, useState } from "react";
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
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>User Tree</h1>
          <UserTree user={userTreeData} depth={0} />
        </div>
      )}
    </div>
  );
};
