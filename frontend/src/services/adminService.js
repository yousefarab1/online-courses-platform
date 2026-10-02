import api from "./api";

export const getDashboardStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
};

export const getAllCourses = async () => {
    const response = await api.get("/admin/courses");
    return response.data;
};

export const deleteAnyCourse = async (courseId) => {
    const response = await api.delete(`/admin/courses/${courseId}`);
    return response.data;
};

export const getPublicStats = async () => {
    const response = await api.get("/stats/public");
    return response.data;
};