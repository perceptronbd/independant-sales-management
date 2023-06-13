import React from "react";
import { Button } from "../../components";
import { deleteUser } from "../../api/crudApi";
import { axiosJWT } from "../../utils/axiosUtil";

export const UserManagement = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("userData: ", userData);

  const handleDelete = async (id) => {
    console.log("userData.refreshToken: ", userData.refreshToken);
    try {
      await axiosJWT.delete("/users/" + id, {
        headers: { authorization: "Bearer " + userData.refreshToken },
      });
    } catch (err) {
      console.error("handleDelete: ", err);
    }
  };

  return (
    <div className="m-1 w-full h-screen flex justify-center items-center">
      <Button onClick={() => handleDelete("64862600c17f5dc8cd8cc607")}>
        Delete User
      </Button>
    </div>
  );
};
