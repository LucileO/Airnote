import axios from "axios";
import { toastError } from "../toasts";

axios.defaults.baseURL = "http://10.20.30.3:8000/";

(axios.withCredentials = true),
    axios.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            if (error.response.status === 403)
                toastError("You do not have permission to access this resource");
            else toastError(error.message);
            throw error;
        },
    );

axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.authorization = "Token " + token;
    return request;
});
export default axios;
