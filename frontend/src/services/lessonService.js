import api from "./api";

export const getCourseLessons = async (courseId) => {
    const response = await api.get(`/lessons/course/${courseId}`);
    return response.data;
};

export const createLesson = async (courseId, lessonData) => {
    const response = await api.post(
        `/lessons/course/${courseId}`,
        lessonData
    );

    return response.data;
};

export const updateLesson = async (lessonId, lessonData) => {
    const response = await api.put(
        `/lessons/${lessonId}`,
        lessonData
    );

    return response.data;
};

export const deleteLesson = async (lessonId) => {
    const response = await api.delete(`/lessons/${lessonId}`);
    return response.data;
};
