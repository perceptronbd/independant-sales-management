import axios from "axios";
import jwt_decode from "jwt-decode";
import { refresh } from "../api/auth";

export const axiosJWT = axios.create();

const userData = localStorage.getItem("user");

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(userData.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refresh();
      config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
