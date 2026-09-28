import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";

// Mark Lesson as Completed
export const completeLesson = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check enrollment
        const isEnrolled = course.students.some(
            (studentId) => studentId.toString() === req.user.id
        );

        if (!isEnrolled) {
            return res.status(403).json({
                success: false,
                message: "You must be enrolled in this course"
            });
        }

        const lesson = await Lesson.findOne({
            _id: lessonId,
            course: courseId
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found in this course"
            });
        }

        let progress = await Progress.findOne({
            student: req.user.id,
            course: courseId
        });

        if (!progress) {
            progress = await Progress.create({
                student: req.user.id,
                course: courseId,
                completedLessons: [lessonId]
            });
        } else {
            const alreadyCompleted = progress.completedLessons.some(
                (id) => id.toString() === lessonId
            );

            if (!alreadyCompleted) {
                progress.completedLessons.push(lessonId);
                await progress.save();
            }
        }

        const totalLessons = await Lesson.countDocuments({
            course: courseId
        });

        const completedLessons = progress.completedLessons.length;

        const progressPercentage =
            totalLessons === 0
                ? 0
                : Math.round((completedLessons / totalLessons) * 100);

        res.status(200).json({
            success: true,
            message: "Lesson completed successfully",
            progress: {
                completedLessons,
                totalLessons,
                progressPercentage
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get Course Progress
export const getCourseProgress = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const isEnrolled = course.students.some(
            (studentId) => studentId.toString() === req.user.id
        );

        if (!isEnrolled) {
            return res.status(403).json({
                success: false,
                message: "You must be enrolled in this course"
            });
        }

        const progress = await Progress.findOne({
            student: req.user.id,
            course: courseId
        }).populate(
            "completedLessons",
            "title order duration"
        );

        const totalLessons = await Lesson.countDocuments({
            course: courseId
        });

        const completedLessons = progress
            ? progress.completedLessons.length
            : 0;

        const progressPercentage =
            totalLessons === 0
                ? 0
                : Math.round((completedLessons / totalLessons) * 100);

        res.status(200).json({
            success: true,
            progress: {
                completedLessons,
                totalLessons,
                progressPercentage,
                completedLessonsData:
                    progress?.completedLessons || []
            }
        });
    } catch (error) {
        next(error);
    }
};