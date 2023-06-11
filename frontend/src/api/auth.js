import axios from "axios";

export const login = async (username, password, setIsLoggedIn) => {
  try {
    const res = await axios.post("/login", { username, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    setIsLoggedIn(true);
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
