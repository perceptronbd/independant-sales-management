import { axiosJWT } from "../utils/axiosUtil";

export const verifyManager = async (refreshToken, setIsLoading) => {
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
    console.error("verifyManager API:", error);
  }
};
