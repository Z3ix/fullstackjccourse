import axios from "axios";
import blogServices from "./blogs";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = blogServices.getToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
