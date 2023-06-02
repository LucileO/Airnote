import axios from "./axios";

export const getGrades = (userId) => {
    return axios.get("api/grades?student" + userId);
};

export const getTeacherGrades = (groupId, courseId) => {
    return axios.get("api/grades?group=" + groupId + "&course=" + courseId);
};

export const editGrade = (gradeId, number, comment, course, student, group) => {
    let payload = {
        number,
        comment,
        course,
        student,
        group,
    };
    return axios.put("api/grades/" + gradeId, payload);
};

export const addGrade = (number, comment, course, student, group) => {
    let payload = {
        number,
        comment,
        course,
        student,
        group,
    };
    return axios.post("api/grades/", payload);
};
