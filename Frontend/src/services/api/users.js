import axios from "./axios";

export const getConnectedUser = () => {
    return axios.get("auth/users/me");
};

export const getUsers = () => {
    return axios.get("api/users");
};

export const getUsersByRole = (role) => {
    return axios.get("/api/users?role=" + role);
};

export const getUser = (userId) => {
    return axios.get("api/users/" + userId);
};

export const createUser = (firstname, lastname, email, role, password) => {
    let payload = {
        firstname,
        lastname,
        role,
        password,
        email,
    };
    return axios.post("api/users", payload);
};

export const deleteUser = (userId) => {
    return axios.delete("api/users/" + userId);
};

export const editUser = (userId, firstname, lastname, email, role) => {
    let payload = {
        firstname,
        lastname,
        email,
        role,
    };
    return axios.patch("api/users/" + userId, payload);
};
