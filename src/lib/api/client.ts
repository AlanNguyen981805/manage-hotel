import axios from "axios";
import { API_BASE_URL } from "./config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      "e80283f9f239cbd6e7907033a49d31231153266c15151c2002f2dc8d365bcf163bd6ae9339ff53c40e465fd8fc8970a11ebf39accb620878ab907000e41e5ddd561fb3da1d2ec5e58d9164fcb69faf00b545ee0422b37313df53b2575fe15467a79c4434d59de750472b6ef994ba5c5452b67012c934814d7539cdb42461b86c";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
