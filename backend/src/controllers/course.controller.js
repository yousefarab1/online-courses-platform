import Course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res) => {
    try {
        const { title, description, price, category, level } = req.body;

        if (!title || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description, price and category are required"
            });
        }

        const course = await Course.create({
            title,
            description,
            price,
            category,
            level,
            instructor: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name email")
            .populate("students", "name email");

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


// Get Single Course
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email")
            .populate("students", "name email");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update Course
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Only course instructor can update it
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own courses"
            });
        }

        const { title, description, price, category, level } = req.body;

        course.title = title ?? course.title;
        course.description = description ?? course.description;
        course.price = price ?? course.price;
        course.category = category ?? course.category;
        course.level = level ?? course.level;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Only course instructor can delete it
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own courses"
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


export const getMyCreatedCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            instructor: req.user.id
        })
            .populate("students", "name email")
            .populate("instructor", "name email");

        const coursesWithStats = courses.map((course) => ({
            ...course.toObject(),
            studentsCount: course.students.length
        }));

        res.status(200).json({
            success: true,
            count: coursesWithStats.length,
            courses: coursesWithStats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};