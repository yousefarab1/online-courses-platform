import api from "./api";

export const getLessonComments = async (lessonId) => {
    const response = await api.get(`/comments/lesson/${lessonId}`);
    return response.data;
};

export const addLessonComment = async (lessonId, text) => {
    const response = await api.post(`/comments/lesson/${lessonId}`, {
        text,
    });

    return response.data;
};