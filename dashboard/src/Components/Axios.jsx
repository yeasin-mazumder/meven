import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  // baseURL: "https://servermain.nexlinbd.com/api/v1/",
});

export default api;
