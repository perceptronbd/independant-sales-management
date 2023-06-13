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
  console.log("deleteUser refreshToken: ", refreshToken);
  try {
    await axiosJWT.delete("/users/" + id, {
      headers: { authorization: "Bearer " + refreshToken },
    });
  } catch (error) {
    console.error("deleteUser: ", error);
  }
};
