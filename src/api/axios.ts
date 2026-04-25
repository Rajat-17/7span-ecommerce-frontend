import axios from "axios";
import { HOST_API } from "../config";

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError =
      (error.response && error.response.data) ||
      error.message ||
      "Something went wrong";

    if (error.response?.status === 401) {
      console.log("Unauthorized - redirect to login");
    }

    return Promise.reject(customError);
  }
);

export default axiosInstance;