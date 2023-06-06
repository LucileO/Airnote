import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getActiveClasses = (isActive) => {
    return axios.get("api/groups?isActive=" + isActive);
};

export const getClassesByCourses = (courses) => {
    return axios.get("api/groups?courses=" + courses + "&isActive=true");
};

export const getClassesByReferent = (userId) => {
    return axios.get("api/groups?referent=" + userId);
};

export const getClass = (classId) => {
    return axios.get("api/groups/" + classId);
};

export const getClassFromUser = (studentId, isActive = true) => {
    let suffix = "?student=" + studentId;
    if (isActive !== null) suffix += "&isActive=" + isActive.toString();
    return axios.get("api/groups" + suffix);
};
export const createClass = (level, name, year, modules, isActive) => {
    let payload = {
        level,
        name,
        year,
        modules,
        isActive,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const editClass = (classId, level, name, year, modules, isActive) => {
    let payload = {
        level,
        name,
        year,
        modules,
        isActive,
    };
    return axios.put("api/groups/" + classId, payload);
};

export const classUser = (classId, level, name, year, modules, referent, delegates, students) => {
    let payload = {
        level,
        year,
        name,
        modules,
        referent,
        delegates,
        students,        
    };
    return axios.put("api/groups/" + classId, payload);
};
