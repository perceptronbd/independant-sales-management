import axios from "axios";

export const login = async (email, password, setErrMsg, errMsg) => {
  try {
    const res = await axios.post("/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log("error in login api.", error.response.status);
    setErrMsg(error.response.data.message);
    console.log(errMsg);
  }
};

export const refresh = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
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
    return res.data;
  } catch (error) {
    console.error("error in refresh token", error);
  }
};
