import axios from "./axios";

export const getCourses = () => {
    return axios.get("api/courses");
};

export const getCourse = (courseId) => {
    return axios.get("api/courses/" + courseId);
};

export const getCoursesByTeacher = (teacherId) => {
    return axios.get("api/courses?teacher=" + teacherId);
};

export const editCourse = (courseId, title, leadTeacher, otherTeachers) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
    };

    return axios.put("api/courses/" + courseId, payload);
};

export const deleteCourse = (courseId) => {
    return axios.delete("api/courses/" + courseId);
};

export const createCourse = (title, leadTeacher, otherTeachers) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
    };

    return axios.post("api/courses", payload);
};
