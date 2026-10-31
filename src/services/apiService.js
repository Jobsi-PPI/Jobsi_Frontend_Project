import axios from "axios";
import { API_BASE_URL } from "../config/env.js";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
