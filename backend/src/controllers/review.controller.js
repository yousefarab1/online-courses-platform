import Review from "../models/Review.js";
import Course from "../models/Course.js";

// Add Review
export const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        if (rating === undefined || !comment) {
            return res.status(400).json({
                success: false,
                message: "Rating and comment are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const course = await Course.findById(req.params.id);

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

        const existingReview = await Review.findOne({
            course: req.params.id,
            student: req.user.id
        });

        if (existingReview) {
            return res.status(409).json({
                success: false,
                message: "You already reviewed this course"
            });
        }

        const review = await Review.create({
            course: req.params.id,
            student: req.user.id,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({
            course: req.params.id
        })
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        next(error);
    }
};