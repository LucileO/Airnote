import axios from "./axios";

export const getComment = (studentId, groupId) => {
    return axios.get("api/comments?student=" + studentId + "&group=" + groupId);
};

export const addComment = (comment, studentId, groupId) => {
    let payload = {
        comment,
        student: studentId,
        group: groupId,
    };

    return axios.post("api/comments?student=" + studentId + "&group=" + groupId, payload);
};
export const editComment = (commentId, comment, studentId, groupId) => {
    let payload = {
        comment,
        student: studentId,
        group: groupId,
    };

    return axios.put("api/comments/" + commentId, payload);
};
