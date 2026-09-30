import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import Courses from "../pages/student/Courses";
import CourseDetails from "../pages/student/CourseDetails";
import MyCourses from "../pages/student/MyCourses";
import Learning from "../pages/student/Learning";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditCourse from "../pages/instructor/EditCourse";
import ManageLessons from "../pages/instructor/ManageLessons";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route path="/courses/:courseId/learn" element={<Learning />} />
                <Route path="/my-courses" element={<MyCourses />} />
            </Route>

            {/* Instructor Routes */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["instructor"]} />
                }
            >
                <Route
                    path="/instructor"
                    element={<InstructorDashboard />}
                />

                <Route
                    path="/instructor/courses/new"
                    element={<CreateCourse />}
                />

                <Route
                    path="/instructor/courses/:id/edit"
                    element={<EditCourse />}
                />

                <Route
                    path="/instructor/courses/:courseId/lessons"
                    element={<ManageLessons />}
                />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;