import axios from "./axios";

export const getModules = (moduleId) => {
    let suffix = "";
    if (moduleId) suffix += "/" + moduleId;
    return axios.get("api/modules" + suffix);
};

export const createModule = (title, courses) => {
    let payload = {
        title,
        courses,
    };
    return axios.post("api/modules", payload);
};

export const editModule = (moduleId, title, courses) => {
    let payload = {
        title,
        courses,
    };
    return axios.put("api/modules/" + moduleId, payload);
};

export const deleteModule = (moduleId) => {
    return axios.delete("api/modules/" + moduleId);
};
