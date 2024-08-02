import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
