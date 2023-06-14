import axios from "axios";
import { axiosJWT } from "../utils/axiosUtil";

export const createUser = async (user) => {
  try {
    const res = await axios.post("/create-user", user);
    console.log("User created:", res);
  } catch (error) {
    console.error("Error creating user:", error.response.data);
    throw error.response.data;
  }
};

export const deleteUser = async (id, refreshToken) => {
  try {
    await axiosJWT.delete("/users/" + id, {
      headers: { authorization: "Bearer " + refreshToken },
    });
  } catch (err) {
    console.error("deleteUser Api: ", err);
  }
};

export const getUsers = async (refCode) => {
  try {
    const res = await axios.get("/get-users/" + refCode);
    return res.data;
  } catch (error) {
    console.error("getUsers API: ", error);
    throw error;
  }
};
