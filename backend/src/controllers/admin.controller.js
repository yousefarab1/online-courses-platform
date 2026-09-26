import User from "../models/User.js";
import Course from "../models/Course.js";
import Review from "../models/Review.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name email")
            .populate("students", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot delete himself"
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// delete any course
export const deleteAnyCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const totalInstructors = await User.countDocuments({
            role: "instructor"
        });

        const totalCourses = await Course.countDocuments();

        const totalReviews = await Review.countDocuments();

        const studentsEnrolled = await Course.aggregate([
            {
                $project: {
                    studentsCount: {
                        $size: "$students"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$studentsCount"
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalStudents,
                totalInstructors,
                totalCourses,
                totalReviews,
                totalEnrollments:
                    studentsEnrolled[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};