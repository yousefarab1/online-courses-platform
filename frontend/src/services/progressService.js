import api from "./api";

export const getCourseProgress = async (courseId) => {
    const response = await api.get(`/progress/course/${courseId}`);

    return response.data;
};

export const markLessonComplete = async (courseId, lessonId) => {
    const response = await api.post(
        `/progress/course/${courseId}/lesson/${lessonId}/complete`
    );

    return response.data;
};
