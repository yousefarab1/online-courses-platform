import express from "express";

import {
    addComment,
    getLessonComments
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Add comment
router.post(
    "/lesson/:lessonId",
    protect,
    allowRoles("student"),
    addComment
);

// Get comments
router.get(
    "/lesson/:lessonId",
    getLessonComments
);

export default router;