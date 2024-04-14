import axios from "axios";
import { ACCESS_TOKEN } from "./constants"; // REFRESH_TOKEN

const apiUrl = ""; //Backend Url needed or we can use environment variables

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//       const res = await axios.post(`${api}/api/v1/users/refresh/token`, { refreshToken }); // Adjust URL
//       if (res.status === 200) {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//         api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
//         return api(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;