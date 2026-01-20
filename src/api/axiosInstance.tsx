import axios from "axios";
import { acquireAccessToken } from "../auth/acquireToken";
import { cascadeDafoNowURLs } from "./url/config";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
  },
});


const PUBLIC_ENDPOINT_PREFIXES: string[] = Object.values(
  cascadeDafoNowURLs().login
).map(url => url.toLowerCase());

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches access token for protected endpoints
 */
axiosInstance.interceptors.request.use(
  async config => {
    const url = (config.url ?? "").toLowerCase();

    // Skip token for public endpoints
    const isPublicEndpoint = PUBLIC_ENDPOINT_PREFIXES.some(prefix =>
      url.includes(prefix)
    );

    if (isPublicEndpoint) {
      return config;
    }

    const token = await acquireAccessToken();

    (config.headers as Record<string, string | undefined>).Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);


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
