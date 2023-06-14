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
    console.error("verifyManager API:", error.response);
    throw error.response;
  }
};

export const denyUserAccess = async (refreshToken, setIsLoading) => {
  try {
    await axiosJWT
      .get("/deny-user-access", {
        headers: {
          authorization: "Bearer " + refreshToken,
        },
      })
      .then(() => {
        setIsLoading(false);
      });
  } catch (error) {
    console.error("denyUserAccess API: ", error);
    throw error.response;
  }
};

export const verifyForRefCode = async (refreshToken, setHasRefCode) => {
  try {
    await axiosJWT
      .get("/verify-user-for-refcode", {
        headers: {
          authorization: "Bearer " + refreshToken,
        },
      })
      .then(setHasRefCode(true));
  } catch (error) {
    setHasRefCode(false);
    console.error("verifyForRefCode API: ", error);
  }
};
