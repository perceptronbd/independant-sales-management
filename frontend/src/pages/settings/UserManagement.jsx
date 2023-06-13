import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { deleteUser } from "../../api/crudApi";
import { verifyManager } from "../../api/verifyUser";

export const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.role;
  console.log("userData: ", userData);

  const handleDelete = async (id) => {
    await deleteUser(id, userData.refreshToken);
  };

  useEffect(() => {
    const handleManagerRoute = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      await verifyManager(user.refreshToken, setIsLoading);
    };
    handleManagerRoute();
  }, []);

  return (
    <div className="m-1 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col ">
        <Button onClick={() => handleDelete("64862600c17f5dc8cd8cc607")}>
          Delete User
        </Button>
        {isLoading ? <p>is loading...</p> : <p>Access granted!</p>}
      </div>
    </div>
  );
};
