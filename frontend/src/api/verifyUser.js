import { axiosJWT } from "../utils/axiosUtil";

export const verifyManager = async (refreshToken, setIsLoading, navigate) => {
  try {
    await axiosJWT
      .get("/manager-route", {
        headers: {
          authorization: "Bearer " + refreshToken,
        },
      })
      .then(() => {
        setIsLoading(false);
      });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/home/unauthorized");
    }
    console.error("verifyManager API:", error.response);
  }
};
