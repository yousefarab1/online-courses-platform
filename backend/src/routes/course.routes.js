import express from "express";

import {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    getMyCreatedCourses
} from "../controllers/course.controller.js";

import {
    enrollCourse,
    getMyCourses
} from "../controllers/enrollment.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Public
router.get("/", getCourses);

// Student
router.get(
    "/my-courses",
    protect,
    allowRoles("student"),
    getMyCourses
);

router.post(
    "/:id/enroll",
    protect,
    allowRoles("student"),
    enrollCourse
);

// Instructor
router.get(
    "/my-created",
    protect,
    allowRoles("instructor"),
    getMyCreatedCourses
);

router.post(
    "/",
    protect,
    allowRoles("instructor"),
    createCourse
);

router.put(
    "/:id",
    protect,
    allowRoles("instructor"),
    updateCourse
);

router.delete(
    "/:id",
    protect,
    allowRoles("instructor"),
    deleteCourse
);

// Single course
router.get("/:id", getCourse);

export default router;