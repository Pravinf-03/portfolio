import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-1-t4b1.onrender.com/api/", // Django API runs here
});

export default api;
