import Comment from "../models/Comment.js";
import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

// Add Comment
export const addComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { lessonId } = req.params;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment text is required"
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        // Get the course that owns this lesson
        const course = await Course.findById(lesson.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Student must be enrolled in the course
        const isEnrolled = course.students.some(
            (studentId) => studentId.toString() === req.user.id
        );

        if (!isEnrolled) {
            return res.status(403).json({
                success: false,
                message: "You must be enrolled in the course to comment"
            });
        }

        const comment = await Comment.create({
            lesson: lessonId,
            student: req.user.id,
            text: text.trim()
        });

        const populatedComment = await Comment.findById(comment._id)
            .populate("student", "name email");

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: populatedComment
        });

    } catch (error) {
        next(error);
    }
};


// Get Lesson Comments
export const getLessonComments = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const comments = await Comment.find({
            lesson: lessonId
        })
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });

    } catch (error) {
        next(error);
    }
};