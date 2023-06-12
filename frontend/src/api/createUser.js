import axios from "axios";

export const createUser = async (user) => {
  try {
    const res = await axios.post("/create-user", user);
    console.log("User created:", res);
  } catch (error) {
    console.error("Error creating user:", error.response.data);
    throw error.response.data;
  }
};
