import Course from "../models/Course.js";

export const enrollCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        // Course doesn't exist
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check if student already enrolled
        const alreadyEnrolled = course.students.some(
            (studentId) => studentId.toString() === req.user.id
        );

        if (alreadyEnrolled) {
            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course"
            });
        }

        // Add student
        course.students.push(req.user.id);

        await course.save();

        res.status(200).json({
            success: true,
            message: "Enrolled successfully",
            courseId: course._id,
            studentId: req.user.id
        });

    } catch (error) {
        next(error);
    }
};


export const getMyCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({
            students: req.user.id
        })
            .populate("instructor", "name email");

        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });

    } catch (error) {
        next(error);
    }
};