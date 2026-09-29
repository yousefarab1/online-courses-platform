import api from "./api";

export const getCourseReviews = async (courseId) => {
    const response = await api.get(`/reviews/${courseId}`);
    return response.data;
};

export const addCourseReview = async (courseId, rating, comment) => {
    const response = await api.post(`/reviews/${courseId}`, {
        rating,
        comment,
    });

    return response.data;
};