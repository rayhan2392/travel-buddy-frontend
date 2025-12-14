import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1";

const BASE_URL = "https://travel-buddy-backend-omega.vercel.app/api/v1";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Enable sending cookies with requests
});

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Token expired or invalid, redirect to login
            if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
