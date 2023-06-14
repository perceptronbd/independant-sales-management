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

export const verifyForRefCode = async (
  refreshToken,
  setHasRefCode,
  hasRefCode
) => {
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
