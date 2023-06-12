import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await axios.post("/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log("res.data in login: ", res.data);
    return res.data;
  } catch (error) {
    console.log("error in login api.", error);
  }
};

export const logout = async (refreshToken) => {
  try {
    await axios.post("/logout", { token: refreshToken });
  } catch (error) {
    console.log("error in logout api.", error);
  }
};
