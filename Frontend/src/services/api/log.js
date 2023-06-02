import { toastSuccess } from "../toasts";
import axios from "./axios";

export const login = (email, password) => {
    return axios.post("auth/token/login/", { email, password }).then((response) => {
        localStorage.setItem("token", response.authToken);
        toastSuccess("Successfully logged in");
    });
};

export const logout = () => {
    return axios.post("auth/token/logout/").then(() => {
        localStorage.removeItem("token");
        toastSuccess("Successfully logged out");
    });
};
