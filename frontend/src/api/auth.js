import axios from "axios";

const userData = JSON.parse(localStorage.getItem("user"));

export const login = async (email, password) => {
  try {
    const res = await axios.post("/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log("error in login api.", error);
  }
};

export const refresh = async () => {
  try {
    const res = await axios.post("/refresh-token", {
      token: userData.refreshToken,
    });
    console.log("res in refresh api: ", res.data);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      })
    );
  } catch (error) {
    console.error("error in refresh token", error);
  }
};
