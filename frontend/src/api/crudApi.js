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
    const res = await axiosJWT.delete("/users/" + id, {
      headers: { authorization: "Bearer " + refreshToken },
    });
    console.log(res.status);
    return res.status;
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

export const getAllProducts = async () => {
  try {
    const res = await axios.get("/products");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("getAllProducts:", error);
    throw error;
  }
};

export const createPurchase = async (
  userId,
  products,
  referralID,
  userRole
) => {
  try {
    const res = await axios.post("/purchase", {
      userId,
      products,
      referralID,
      userRole,
    });
    console.log("createPurchase", res);
  } catch (error) {
    console.error("createPurchase:", error);
  }
};

export const getUserTree = async (userId) => {
  try {
    const res = await axios.post("/get-user-tree", { userId });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("getUserTree:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/get-users");
    return res.data;
  } catch (error) {
    console.error("getAllUsers:", error);
  }
};
export const getAllUsersForAgent = async (userId) => {
  try {
    const res = await axios.get("/get-users/" + userId);
    return res.data;
  } catch (error) {
    console.error("getAllUsersForAgent:", error);
  }
};

export const findUser = async (userId) => {
  try {
    const res = await axios.get("/find-user/" + userId);
    return res.data;
  } catch (error) {
    console.error("findUser:", error);
  }
};

export const updateUser = async (userId, updateUser) => {
  try {
    const res = await axios.put("/update-user/" + userId, updateUser);
    console.log(res);
    return res;
  } catch (error) {
    console.error("updateUser:", error);
  }
};

export const makeCheckoutRequest = async (userId, reqCheckoutCOP, comment) => {
  try {
    const checkoutData = {
      userId,
      reqCheckoutCOP,
      comment,
    };

    const response = await axios.post("/req-checkout", checkoutData);

    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
