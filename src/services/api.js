import axios from "axios";

const api = axios.create({
  baseURL: "https://cema-health-winl.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;