import express from "express";

import {
    getAllUsers,
    getAllCourses,
    deleteUser,
    deleteAnyCourse,
    getDashboardStats
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(
    protect,
    allowRoles("admin")
);

router.get(
    "/users",
    getAllUsers
);

router.delete(
    "/users/:id",
    deleteUser
);

router.get(
    "/courses",
    getAllCourses
);

router.delete(
    "/courses/:id",
    deleteAnyCourse
);

router.get(
    "/stats",
    getDashboardStats
);

export default router;