import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.6.78/", // import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
  },
});

/**
 * REQUEST INTERCEPTOR */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Specific handling for your validation endpoint
    if (error.response?.status === 401 && import.meta.env.DEV) {
      console.error("Unauthorized – Check your API credentials or local setup");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
