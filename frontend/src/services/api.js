import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Course service (Laravel)
export const courseApi = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const enrollmentApi = axios.create({
    baseURL: 'http://localhost:5002/api',
  });
  

// Attach token to every request if available
[authApi, courseApi, enrollmentApi].forEach((api) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});
