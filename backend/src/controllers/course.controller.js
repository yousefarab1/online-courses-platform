import Course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res, next) => {
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
        next(error);
    }
};


// Get All Courses
export const getCourses = async (req, res, next) => {
    try {
        const {
            search,
            category,
            level,
            minPrice,
            maxPrice,
            instructor,
            page = 1,
            limit = 10,
            sort
        } = req.query;

        const filter = {};

        if (instructor) {
            filter.instructor = instructor;
        }

        // Search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by level
        if (level) {
            filter.level = level;
        }

        // Filter by price
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        let sortOption = { createdAt: -1 };

        if (sort === "price-asc") {
            sortOption = { price: 1 };
        }

        if (sort === "price-desc") {
            sortOption = { price: -1 };
        }

        if (sort === "newest") {
            sortOption = { createdAt: -1 };
        }

        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }

        const courses = await Course.find(filter)
            .populate("instructor", "name email")
            .populate("students", "name email")
            .skip(skip)
            .limit(Number(limit))
            .sort(sortOption);

        const total = await Course.countDocuments(filter);

        res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            count: courses.length,
            courses
        });

    } catch (error) {
        next(error);
    }
};


// Get Single Course
export const getCourse = async (req, res, next) => {
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
        next(error);
    }
};



// Update Course
export const updateCourse = async (req, res, next) => {
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
        next(error);
    }
};


// Delete Course
export const deleteCourse = async (req, res, next) => {
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
        next(error);
    }
};


export const getMyCreatedCourses = async (req, res, next) => {
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
        next(error);
    }
};