import axios from "axios";

// EXPO URL + BACKEND PORT
const api = axios.create({ baseURL: "http://192.168.0.103:8080" });

export default api;
