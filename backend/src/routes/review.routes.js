import express from "express";

import {
    addReview,
    getCourseReviews
} from "../controllers/review.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/:id",
    protect,
    allowRoles("student"),
    addReview
);

router.get(
    "/:id",
    getCourseReviews
);

export default router;