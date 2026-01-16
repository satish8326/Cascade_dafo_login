import axios from "axios";
import { acquireAccessToken } from "../auth/acquireToken";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches access token
 */
axiosInstance.interceptors.request.use(
  async config => {
    const token = await acquireAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Handles auth failures globally
 */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("Unauthorized – token expired or invalid");
    }
    return Promise.reject(error);
  }
);
