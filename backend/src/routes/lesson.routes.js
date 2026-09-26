import express from "express";

import {
    createLesson,
    getCourseLessons,
    updateLesson,
    deleteLesson
} from "../controllers/lesson.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Get all lessons of a course
router.get(
    "/course/:courseId",
    getCourseLessons
);

// Instructor
router.post(
    "/course/:courseId",
    protect,
    allowRoles("instructor"),
    createLesson
);

router.put(
    "/:id",
    protect,
    allowRoles("instructor"),
    updateLesson
);

router.delete(
    "/:id",
    protect,
    allowRoles("instructor"),
    deleteLesson
);

export default router;