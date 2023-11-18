import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const token = getLocalStorage("token");
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;