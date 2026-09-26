import express from "express";

import {
    completeLesson,
    getCourseProgress
} from "../controllers/progress.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/course/:courseId/lesson/:lessonId/complete",
    protect,
    allowRoles("student"),
    completeLesson
);

router.get(
    "/course/:courseId",
    protect,
    allowRoles("student"),
    getCourseProgress
);

export default router;