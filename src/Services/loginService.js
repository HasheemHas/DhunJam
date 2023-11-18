import axios from "./axiosConfig";
import { setLocalStorage } from "../utils/localStorage";

export const adminLogin = async (data) => {
    try {
        const url = `/account/admin/login`
        const response = await axios.post(url, data).then(res => {
            const { status, data, server_err_msg, response } = res.data;
            if (status === 200) {
                setLocalStorage("loginId", data.id);
                setLocalStorage("token", data.token);
                return { message: response, data }
            }
            return { message: server_err_msg, data: null };
        });
        return response;
    } catch (error) {
        return { data: null, message: "Something went wrong. Please try again.!" };
    }
}