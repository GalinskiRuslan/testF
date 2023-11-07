import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "http://78.40.108.96:6969",
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
