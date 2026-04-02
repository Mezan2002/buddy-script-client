import axios from "axios";

const api = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const encodedToken = localStorage.getItem("BST");
      if (encodedToken) {
        try {
          const token = atob(encodedToken);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (e) {
          console.error("Token decoding failed", e);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
