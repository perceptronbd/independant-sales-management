import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { deleteUser } from "../../api/crudApi";
import { verifyManager } from "../../api/verifyUser";
import { useNavigate } from "react-router-dom";

export const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("userData: ", userData);

  const handleDelete = async (id) => {
    await deleteUser(id, userData.refreshToken);
  };

  useEffect(() => {
    const handleManagerRoute = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      await verifyManager(user.refreshToken, setIsLoading, navigate);
    };
    handleManagerRoute();
  }, []);

  return (
    <div className="m-1 w-full h-screen flex justify-center items-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Button onClick={() => handleDelete("64862600c17f5dc8cd8cc607")}>
          Delete User
        </Button>
      )}
    </div>
  );
};
