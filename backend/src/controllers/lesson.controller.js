import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

// Create Lesson
export const createLesson = async (req, res) => {
    try {
        const { title, description, videoUrl, order, duration } = req.body;

        if (!title || order === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title and order are required"
            });
        }

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Only course instructor can add lessons
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only add lessons to your own courses"
            });
        }

        const lesson = await Lesson.create({
            course: req.params.courseId,
            title,
            description,
            videoUrl,
            order,
            duration
        });

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Lessons for a Course
export const getCourseLessons = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const lessons = await Lesson.find({
            course: req.params.courseId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: lessons.length,
            lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Lesson
export const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const course = await Course.findById(lesson.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own lessons"
            });
        }

        const {
            title,
            description,
            videoUrl,
            order,
            duration
        } = req.body;

        lesson.title = title ?? lesson.title;
        lesson.description = description ?? lesson.description;
        lesson.videoUrl = videoUrl ?? lesson.videoUrl;
        lesson.order = order ?? lesson.order;
        lesson.duration = duration ?? lesson.duration;

        await lesson.save();

        res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            lesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Lesson
export const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const course = await Course.findById(lesson.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own lessons"
            });
        }

        await lesson.deleteOne();

        res.status(200).json({
            success: true,
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};