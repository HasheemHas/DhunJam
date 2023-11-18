import axios from "./axiosConfig";

export const getAdminDashboard = async (id) => {
    try {
        const url = `/account/admin/${id}`;
        const response = await axios.get(url).then(res => {
            const { status, data, server_err_msg, response } = res.data;
            if (status === 200) {
                return { message: response, data };
            }
            return { message: server_err_msg, data: null };
        });
        return response;
    } catch (error) {
        return { data: null, message: "Something went wrong. Please try again.!" };
    }
}

export const updateAdminDashboard = async ({ id, data }) => {
    try {
        const url = `/account/admin/${id}`;
        const response = await axios.put(url, { ...data }).then(res => {
            const { status, data, server_err_msg, response } = res.data;
            if (status === 200) {
                return { message: response, data };
            }
            return { message: server_err_msg, data: null };
        });
        return response;
    } catch (error) {
        return { data: null, message: "Something went wrong. Please try again.!" };
    }
}