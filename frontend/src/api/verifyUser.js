import { axiosJWT } from "../utils/axiosUtil";

export const verifyManager = async (refreshToken) => {
  try {
    await axiosJWT.get("/protected-for-manager", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  } catch (error) {
    console.error("verifyManager: ", error);
  }
};
