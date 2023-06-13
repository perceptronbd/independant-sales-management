import axios from "axios";

const userData = localStorage.getItem("user");

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

export const refresh = async (refreshToken, setUser) => {
  try {
    const res = await axios.post("/refresh", {
      token: refreshToken,
    });
    setUser({
      ...userData,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
  } catch (error) {
    console.error("error in refresh token", error);
  }
};
